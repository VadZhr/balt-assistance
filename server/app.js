const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

const db = require("./config/db.js");

const Cursor = require("./models/cursors.js");

(async () => {
  try {
    await db.authenticate();
    console.log("✔️ Connected to PostgreSQL (myapp_db)");

    await db.sync();
    console.log('✔️ Model synchronized (table "cursors" is ready)');
  } catch (error) {
    console.error("❌ Error connecting to DB or inserting:", error);
    process.exit(1);
  }
})();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ['https://balt-assistance.vercel.app'],
    methods: ["GET", "POST"],
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['https://balt-assistance.vercel.app'],
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  const randomColor = `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;

  try {
    await Cursor.create({
      sessionId: socket.id,
      x: 0,
      y: 0,
      color: randomColor,
      connected: true,
      eventType: "connect",
    });
  } catch (err) {
    console.error("Ошибка при создании Cursor:", err);
  }

  try {
    const all = await Cursor.findAll({
      attributes: ["sessionId", "x", "y", "color", "connected"],
    });
    // Шлём только что подключившемуся клиенту
    socket.emit(
      "initial_cursors",
      all.map((c) => ({
        id: c.sessionId,
        x: c.x,
        y: c.y,
        color: c.color,
        connected: c.connected,
      }))
    );
  } catch (err) {
    console.error("Ошибка при fetch initial_cursors:", err);
  }

  socket.on("mouse_move", async (payload) => {
    const { x, y, color } = payload;

    try {
      await Cursor.update({ x, y }, { where: { sessionId: socket.id } });
    } catch (err) {
      console.error("Ошибка обновления Cursor:", err);
    }

    socket.broadcast.emit("cursor_moved", {
      id: socket.id,
      x,
      y,
      color,
    });
    // 3.1) Рассылаем всем остальным клиентам новую позицию
  });

  socket.on("disconnect", async () => {
    console.log("disconnect");

    try {
      // Обновляем БД: только одну запись по sessionId
      await Cursor.update(
        { connected: false, eventType: "disconnect" },
        { where: { sessionId: socket.id } }
      );
    } catch (err) {
      console.error("Ошибка обновления Cursor:", err);
    }

    socket.broadcast.emit("cursor_disconnected", {
      id: socket.id,
    });
  });
});

server.listen(process.env.PORT || 4000, () => console.log("server runs"));

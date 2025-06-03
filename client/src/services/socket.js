import { io } from "socket.io-client";

const URL = "http://localhost:4000";

export const socket = io(URL, {
  transports: ["websocket"],
  autoConnect: true,
});

socket.on("connect", () => {
  console.log("Успешно подключились к серверу, id =", socket.id);
});

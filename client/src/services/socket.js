import { io } from "socket.io-client";

const URL = "https://balt-assistance-production.up.railway.app";

export const socket = io(URL, {
  // transports: ["websocket"],
  autoConnect: true,
});

socket.on("connect", () => {
  console.log("Успешно подключились к серверу, id =", socket.id);
});

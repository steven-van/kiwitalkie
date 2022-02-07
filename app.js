const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    date = new Date();
    time =
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0");
    message.timestamp = time;

    io.emit("message", message, socket.id);
  });
});

httpServer.listen(1337, () => {
  console.log("Listenning on port 1337");
});

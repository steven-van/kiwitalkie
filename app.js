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

var username = {};

io.on("connection", (socket) => {
  socket.on("add-user", (user) => {
    username[socket.id] = user;
  });
  socket.on("send-message", (message, room) => {
    const date = new Date();
    const time =
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0");
    message.timestamp = time;
    message.username = username[socket.id];
    if (room === "") {
      socket.broadcast.emit("receive-message", message);
    } else {
      socket.to(room).emit("receive-message", message);
    }
  });
  socket.on("join-room", (newRoom, previousRoom) => {
    if (previousRoom !== "") {
      socket.leave(previousRoom);
    }
    socket.join(newRoom);
    console.log(`Joined room ${newRoom}`);
  });
});

httpServer.listen(1337, () => {
  console.log("Listenning on port 1337");
});

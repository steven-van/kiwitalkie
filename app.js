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
  socket.on("disconnect", () => {
    delete username[socket.id];
    console.log(username);
  });

  socket.on("add-user", (user) => {
    username[socket.id] = user;
    console.log(`Logged in as ${username[socket.id]}`);
    console.log(username);
  });

  socket.on("remove-user", () => {
    console.log(`Logging out : ${username[socket.id]}`);
    delete username[socket.id];
    username[socket.id] == undefined
      ? console.log(`${username[socket.id]} Logged out`)
      : console.log("Error while logging out");
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
    console.log(`${username[socket.id]} joined room ${newRoom}`);
  });
});

httpServer.listen(1337, () => {
  console.log("Listenning on port 1337");
});

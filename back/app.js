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

var usernames = {};

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log(`${usernames[socket.id]} logged out`);
    delete usernames[socket.id];
    console.log(usernames);
  });

  socket.on("add-user", (user) => {
    usernames[socket.id] = user;
    console.log(`Logged in as ${usernames[socket.id]}`);
    console.log(usernames);
  });

  socket.on("remove-user", () => {
    temp = usernames[socket.id];
    console.log(`Logging out : ${usernames[socket.id]}`);
    delete usernames[socket.id];
    usernames[socket.id] == undefined
      ? console.log(`${temp} logged out`)
      : console.log("Error while logging out");
  });
  socket.on("send-message", (message, room) => {
    const date = new Date();
    const time =
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0");
    message.timestamp = time;
    message.username = usernames[socket.id];
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
    console.log(`${usernames[socket.id]} joined room ${newRoom}`);
  });
});

httpServer.listen(1337, () => {
  console.log("Listenning on port 1337");
});

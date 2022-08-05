const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

io.on("connection", (socket) => {
  socket.on("send_message", ({ id, name, message, date }) => {
    io.emit("send_message", {
      id,
      name,
      message,
      date,
    });
  });

  socket.on("all_users", (id) => {
    io.emit("all_users", {
      count: io.of("/").sockets.size,
    });
  });

  socket.on("disconnect", () => {
    io.emit("all_users", {
      count: io.of("/").sockets.size,
    });
  });
});

server.listen(process.env.PORT || 3001, () => {
  console.log("server RUN");
});

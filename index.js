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
  res.sendFile(path.join(__dirname, "build", "index.js"));
});

io.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    io.emit("send_message", {
      id: socket.id,
      name: data.name,
      message: data.message,
    });
  });
});

server.listen(process.env.PORT || 3001, () => {
  console.log("server RUN");
});

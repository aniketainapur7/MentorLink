const { Server } = require("socket.io");
const http = require("http");

let io;
const userSocketMap = {}; // { userId: socketId }

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap[userId] = socket.id;
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      if (userId) {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
      }
    });
  });
}

function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

module.exports = { initSocket, getReceiverSocketId, io: () => io };

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const { connectDB, sequelize } = require("./config/db");
const User = require("./models/User");
const TokenBlackList = require("./models/TokenBlackList");
const Post = require("./models/Post");
const Chat = require("./models/Chat");
const Message = require("./models/Message");
const { baseUrl } = require("./utils/apiContants");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: baseUrl,
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// Define associations
Chat.hasMany(Message, { foreignKey: "chatId", as: "messages" });
Message.belongsTo(Chat, { foreignKey: "chatId", as: "chat" });

app.use("/api/posts", require("./routes/posts"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api", require("./routes/protected"));
app.use("/media", express.static("media"));

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.id} joined chat ${chatId}`);
  });

  socket.on("leaveChat", (chatId) => {
    socket.leave(chatId);
    console.log(`User ${socket.id} left chat ${chatId}`);
  });

  socket.on("typing", (data) => {
    socket.to(data.chatId).emit("userTyping", { userId: data.userId, isTyping: true });
  });

  socket.on("stopTyping", (data) => {
    socket.to(data.chatId).emit("userTyping", { userId: data.userId, isTyping: false });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Make io accessible from controllers
app.set("io", io);

const PORT = process.env.PORT;

(async () => {
  await connectDB();
  await sequelize.sync({ alter: true });
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();

import io from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

class SocketService {
  constructor() {
    this.socket = null;
    this.currentChatId = null;
  }

  connect() {
    this.socket = io(SOCKET_URL);
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinChat(chatId) {
    if (this.socket && chatId) {
      this.currentChatId = chatId;
      this.socket.emit("joinChat", chatId);
    }
  }

  leaveChat(chatId) {
    if (this.socket && chatId) {
      this.socket.emit("leaveChat", chatId);
      this.currentChatId = null;
    }
  }

  sendMessage(chatId, message) {
    if (this.socket) {
      this.socket.emit("sendMessage", { chatId, message });
    }
  }

  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on("newMessage", callback);
    }
  }

  onUserTyping(callback) {
    if (this.socket) {
      this.socket.on("userTyping", callback);
    }
  }

  startTyping(chatId, userId) {
    if (this.socket) {
      this.socket.emit("typing", { chatId, userId });
    }
  }

  stopTyping(chatId, userId) {
    if (this.socket) {
      this.socket.emit("stopTyping", { chatId, userId });
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

const socketService = new SocketService();
export default socketService;

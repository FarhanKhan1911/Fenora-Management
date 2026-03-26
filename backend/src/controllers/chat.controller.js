const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");
const { Op } = require("sequelize");
const { postsWithMediaPath } = require("../utils/media");

const getChats = async (req, res) => {
  try {
    const userId = req.user.id;
    const chats = await Chat.findAll({
      where: {
        [Op.or]: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: [
        { model: User, as: "user1", attributes: ["id", "name", "role", "mediaURL"] },
        { model: User, as: "user2", attributes: ["id", "name", "role", "mediaURL"] },
        {
          model: Message,
          as: "messages",
          limit: 1,
          order: [["createdAt", "DESC"]],
          attributes: ["content", "createdAt"],
        },
      ],
      order: [["updatedAt", "DESC"]],
    });

    // Format chats to include the other user and last message
    const formattedChats = chats.map((chat) => {
      const otherUser = chat.user1Id === userId ? chat.user2 : chat.user1;
      const userWithMediaPath = postsWithMediaPath([otherUser], req)[0];
      const lastMessage = chat.messages && chat.messages.length > 0 ? chat.messages[0] : null;
      return {
        id: chat.id,
        otherUser: {
          id: userWithMediaPath.id,
          name: userWithMediaPath.name,
          role: userWithMediaPath.role,
          mediaURL: userWithMediaPath.mediaURL,
          mediaPath: userWithMediaPath.mediaPath,
        },
        lastMessage: lastMessage
          ? {
              content: lastMessage.content,
              createdAt: lastMessage.createdAt,
            }
          : null,
        updatedAt: chat.updatedAt,
      };
    });

    res.json(formattedChats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createChat = async (req, res) => {
  try {
    const { otherUserId } = req.body;
    const userId = req.user.id;

    if (userId === otherUserId) {
      return res.status(400).json({ message: "Cannot create chat with yourself" });
    }

    // Ensure user1Id < user2Id for consistency
    const [user1Id, user2Id] = userId < otherUserId ? [userId, otherUserId] : [otherUserId, userId];

    let chat = await Chat.findOne({
      where: { user1Id, user2Id },
    });

    if (!chat) {
      chat = await Chat.create({ user1Id, user2Id });
    }

    res.status(201).json({ chatId: chat.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    // Verify user is part of the chat
    const chat = await Chat.findOne({
      where: {
        id: chatId,
        [Op.or]: [{ user1Id: userId }, { user2Id: userId }],
      },
    });

    if (!chat) {
      return res.status(403).json({ message: "Access denied" });
    }

    const messages = await Message.findAll({
      where: { chatId },
      include: [{ model: User, as: "sender", attributes: ["id", "name", "role", "mediaURL"] }],
      order: [["createdAt", "ASC"]],
    });

    // Add mediaPath to senders
    const messagesWithMediaPath = messages.map((message) => ({
      ...message.toJSON(),
      sender: postsWithMediaPath([message.sender], req)[0],
    }));

    res.json(messagesWithMediaPath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { chatId, content } = req.body;
    const senderId = req.user.id;

    // Verify user is part of the chat
    const chat = await Chat.findOne({
      where: {
        id: chatId,
        [Op.or]: [{ user1Id: senderId }, { user2Id: senderId }],
      },
    });

    if (!chat) {
      return res.status(403).json({ message: "Access denied" });
    }

    const message = await Message.create({
      chatId,
      senderId,
      content,
    });

    // Update chat updatedAt
    await chat.update({ updatedAt: new Date() });

    // Get the full message with sender info for real-time emission
    const messageWithSender = await Message.findOne({
      where: { id: message.id },
      include: [{ model: User, as: "sender", attributes: ["id", "name", "role", "mediaURL"] }],
    });

    // Add mediaPath to sender
    const messageWithMediaPath = {
      ...messageWithSender.toJSON(),
      sender: postsWithMediaPath([messageWithSender.sender], req)[0],
    };

    // Emit the new message to all users in the chat room
    const io = req.app.get("io");
    io.to(chatId).emit("newMessage", messageWithMediaPath);

    res.status(201).json(messageWithMediaPath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getChats,
  createChat,
  getMessages,
  sendMessage,
};

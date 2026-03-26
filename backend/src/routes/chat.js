const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getChats, createChat, getMessages, sendMessage } = require("../controllers/chat.controller");

const router = express.Router();

// All chat routes require authentication
router.use(authMiddleware);

router.get("/", getChats);

router.post("/", createChat);

router.get("/:chatId/messages", getMessages);

router.post("/:chatId/messages", sendMessage);

module.exports = router;

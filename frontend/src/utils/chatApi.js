import axios from "axios";
import { GET_CHATS_API, CREATE_CHAT_API, GET_MESSAGES_API, SEND_MESSAGE_API } from "./ApisConstants";
import { applicationJsonType } from "../hooks/useAuth";

const isAuthenticated = true;

export const getChats = async () => {
  try {
    const response = await axios.get(GET_CHATS_API, applicationJsonType(isAuthenticated));
    return response.data;
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw error;
  }
};

export const createChat = async (otherUserId) => {
  try {
    const response = await axios.post(CREATE_CHAT_API, { otherUserId }, applicationJsonType(isAuthenticated));
    return response.data;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};

export const getMessages = async (chatId) => {
  try {
    const response = await axios.get(GET_MESSAGES_API(chatId), applicationJsonType(isAuthenticated));
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export const sendMessage = async (chatId, content) => {
  try {
    const response = await axios.post(SEND_MESSAGE_API(chatId), { chatId, content }, applicationJsonType(isAuthenticated));
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

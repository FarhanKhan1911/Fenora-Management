import { ActionType } from "./redux.type";

export const setUserType = (userTypeName) => {
  return {
    type: ActionType.userType,
    payload: userTypeName,
  };
};

export const setUserId = (userId) => {
  return {
    type: ActionType.userId,
    payload: userId,
  };
};

export const setChats = (chats) => {
  return {
    type: ActionType.setChats,
    payload: chats,
  };
};

export const setCurrentChat = (chat) => {
  return {
    type: ActionType.setCurrentChat,
    payload: chat,
  };
};

export const setMessages = (messages) => {
  return {
    type: ActionType.setMessages,
    payload: messages,
  };
};

export const addMessage = (message) => {
  return {
    type: ActionType.addMessage,
    payload: message,
  };
};

export const updateChatLastMessage = (chatId, message) => {
  return {
    type: ActionType.updateChatLastMessage,
    payload: { chatId, message },
  };
};

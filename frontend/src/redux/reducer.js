import { ActionType } from "./redux.type";

const initialState = {
  userType: null,
  userId: null,
  chats: [],
  currentChat: null,
  messages: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.userType:
      return { ...state, userType: action.payload };
    case ActionType.userId:
      return { ...state, userId: action.payload };
    case ActionType.setChats:
      return { ...state, chats: action.payload };
    case ActionType.setCurrentChat:
      return { ...state, currentChat: action.payload };
    case ActionType.setMessages:
      return { ...state, messages: action.payload };
    case ActionType.addMessage:
      return { ...state, messages: [...state.messages, action.payload] };
    case ActionType.updateChatLastMessage:
      return {
        ...state,
        chats: state.chats.map((chat) => (chat.id === action.payload.chatId ? { ...chat, lastMessage: action.payload.message } : chat)),
      };
    default:
      return state;
  }
};

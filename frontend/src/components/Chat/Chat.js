import SideBar from "./SideBar/SideBar";
import ChatArea from "./ChatArea/ChatArea";
import "./Chat.scss";
import BackButton from "../Button/BackButton";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChats, addMessage, updateChatLastMessage } from "../../redux/action";
import { getChats } from "../../utils/chatApi";
import socketService from "../../utils/socketService";

const Chat = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const currentChat = useSelector((state) => state.currentChat);
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chats = await getChats();
        dispatch(setChats(chats));
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };

    if (auth) {
      fetchChats();
      socketService.connect();
      // Listen for new messages
      socketService.onNewMessage((message) => {
        // Only add message if it's not from the current user (to avoid duplicates)
        if (message.senderId !== userId) {
          dispatch(addMessage(message));
          // Update the chat's last message in the sidebar
          dispatch(updateChatLastMessage(message.chatId, message));
        }
      });
    }

    return () => {
      socketService.disconnect();
    };
  }, [auth, dispatch, userId]);

  useEffect(() => {
    if (currentChat) {
      socketService.joinChat(currentChat.id);
    }

    return () => {
      if (currentChat) {
        socketService.leaveChat(currentChat.id);
      }
    };
  }, [currentChat]);

  return (
    <div className='chat-app'>
      <div className='header-row'>
        <BackButton />
        <h2>Chat Room</h2>
      </div>
      <div className='body-row'>
        <SideBar />
        <ChatArea />
      </div>
    </div>
  );
};

export default Chat;

import Button from "../../../Button/Button";
import "./ChatInput.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, updateChatLastMessage } from "../../../../redux/action";
import { sendMessage as sendMessageApi } from "../../../../utils/chatApi";
import socketService from "../../../../utils/socketService";

const ChatInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const currentChat = useSelector((state) => state.currentChat);
  const userId = useSelector((state) => state.userId);
  const dispatch = useDispatch();

  const handleSend = async () => {
    if (!inputValue.trim() || !currentChat) return;

    try {
      const message = await sendMessageApi(currentChat.id, inputValue.trim());
      dispatch(addMessage(message));
      dispatch(updateChatLastMessage(currentChat.id, message));
      setInputValue("");
      setIsTyping(false);
      socketService.stopTyping(currentChat.id, userId);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    if (currentChat && !isTyping) {
      setIsTyping(true);
      socketService.startTyping(currentChat.id, userId);
    }

    // Stop typing after 2 seconds of inactivity
    setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        socketService.stopTyping(currentChat.id, userId);
      }
    }, 2000);
  };

  return (
    <>
      {currentChat && (
        <div className='chat-input'>
          <input
            type='text'
            placeholder='Type your message here...'
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <Button className='send-btn' iconClass='fas fa-paper-plane' onClickHandle={handleSend} />
        </div>
      )}
    </>
  );
};

export default ChatInput;

import Message from "./Message/Message";
import "./ChatMessages.scss";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import socketService from "../../../../utils/socketService";

const ChatMessages = () => {
  const messages = useSelector((state) => state.messages);
  const userId = useSelector((state) => state.userId);
  const currentChat = useSelector((state) => state.currentChat);
  const messagesEndRef = useRef(null);
  const [typingUsers, setTypingUsers] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);

  useEffect(() => {
    if (currentChat) {
      // Listen for typing events
      const handleUserTyping = (data) => {
        if (data.userId !== userId) {
          setTypingUsers((prev) => {
            if (data.isTyping && !prev.includes(data.userId)) {
              return [...prev, data.userId];
            } else if (!data.isTyping) {
              return prev.filter((id) => id !== data.userId);
            }
            return prev;
          });
        }
      };

      socketService.onUserTyping(handleUserTyping);

      return () => {
        socketService.off("userTyping", handleUserTyping);
      };
    }
  }, [currentChat, userId]);

  return (
    <div className='chat-messages'>
      {messages.map((message) => (
        <Message
          key={message?.id}
          type={message?.senderId === userId ? "sent" : "received"}
          text={message.content}
          sender={message.sender}
        />
      ))}
      {typingUsers.length > 0 && (
        <div className='typing-indicator'>
          <div className='typing-dots'>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className='typing-text'>Someone is typing...</span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;

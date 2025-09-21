import { useState } from "react";
import MessageList from "./MessageList/MessageList";
import MessageInput from "./MessageInput/MessageInput";
import "./Chat.scss";
import BackButton from "../Button/BackButton";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };
  return (
    <div className='chat-app'>
      <BackButton />
      <h2>Chat Room</h2>
      <MessageList messages={messages} />
      <MessageInput addMessage={addMessage} />
    </div>
  );
};

export default Chat;

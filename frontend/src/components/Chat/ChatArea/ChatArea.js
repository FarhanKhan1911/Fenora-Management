
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatInput from "./ChatInput/ChatInput";
import ChatMessages from "./ChatMessages/ChatMessages";
import "./ChatArea.scss";

const ChatArea = () => {
  return (
    <div className='chat-area'>
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default ChatArea;

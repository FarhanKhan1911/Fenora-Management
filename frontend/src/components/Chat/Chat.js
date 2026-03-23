import SideBar from "./SideBar/SideBar";
import ChatArea from "./ChatArea/ChatArea";
import "./Chat.scss";
import BackButton from "../Button/BackButton";
import { useAuth } from "../../hooks/useAuth";

const Chat = () => {
  const auth = useAuth();
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

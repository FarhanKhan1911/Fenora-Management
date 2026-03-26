import ChatItem from "./ChatItem/ChatItem";
import "./SideBar.scss";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentChat, setMessages } from "../../../redux/action";
import { getMessages } from "../../../utils/chatApi";

const Sidebar = () => {
  const chats = useSelector((state) => state.chats);
  const dispatch = useDispatch();

  const handleChatClick = async (chat) => {
    dispatch(setCurrentChat(chat));
    console.log(chat);
    try {
      const messages = await getMessages(chat.id);
      dispatch(setMessages(messages));
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  return (
    <div className='sidebar'>
      <div className='search'>
        <input type='text' placeholder='Search' />
      </div>
      <div className='chat-list'>
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            name={chat.otherUser.name}
            message={chat.lastMessage ? chat.lastMessage.content : "No messages yet"}
            time={chat.lastMessage ? new Date(chat.lastMessage.createdAt).toLocaleTimeString() : ""}
            profilePic={chat.otherUser.mediaPath}
            onClick={() => handleChatClick(chat)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

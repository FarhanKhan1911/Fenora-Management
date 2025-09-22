import ChatItem from "./ChatItem/ChatItem";
import "./SideBar.scss";  

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='search'>
        <input type='text' placeholder='Search' />
      </div>
      <div className='chat-list'>
        <ChatItem name='Alex Chen' message='Dua Chags' time='10:39' />
        <ChatItem name='Project Team' message='Tnoast Tres' time='20:51' />
        <ChatItem name='Project Team' message='3' time='23:13' badge='3' />
        <ChatItem name='Unvutguts' message='Willtsrattns' time='10:13' />
        <ChatItem name='Support' message='Surepel Ves' time='14:07' />
        <ChatItem name='Desaig Sous' message='Salo uj Mes' time='18:19' />
      </div>
    </div>
  );
};

export default Sidebar;

import "./ChatItem.scss";
import defaultProfilePic from "../../../../media/assets/images/default-profile.png";

const ChatItem = ({ name, message, time, badge, profilePic, onClick }) => {
  return (
    <div className='chat-item' onClick={onClick}>
      <img className='chat-avatar' src={profilePic || defaultProfilePic} alt='' />
      <div className='chat-info'>
        <h4>{name}</h4>
        <p>{message}</p>
      </div>
      <div className='chat-time'>
        {time} {badge && <span className='badge'>{badge}</span>}
      </div>
    </div>
  );
};

export default ChatItem;

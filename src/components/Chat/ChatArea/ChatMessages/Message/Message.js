import "./Message.scss";
import defaultProfilePic from "../../../../../media/assets/images/default-profile.png";

const Message = ({ type, text, sender }) => {
  return (
    <div className={`message ${type}`}>
      {type === "received" && sender && <img className='message-avatar' src={sender.mediaPath || defaultProfilePic} alt='' />}
      <div className='message-content'>
        {type === "received" && sender && <div className='sender-name'>{sender.name}</div>}
        <div className='message-text'>{text}</div>
      </div>
    </div>
  );
};

export default Message;

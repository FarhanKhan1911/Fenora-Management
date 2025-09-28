import "./ChatItem.scss";

const ChatItem = ({ name, message, time, badge }) => {
  return (
    <div className='chat-item'>
      <div className='chat-avatar'></div>
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

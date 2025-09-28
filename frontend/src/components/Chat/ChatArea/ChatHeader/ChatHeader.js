import Button from "../../../Button/Button";
import "./ChatHeader.scss";

const ChatHeader = () => {
  return (
    <div className='chat-header'>
      <div className='chat-header-info'>
        <img src='https://cdn-icons-png.flaticon.com/512/1946/1946429.png' alt='profile' />
        <h4>Project Team</h4>
      </div>
      <div className='chat-header-icons'>
        <Button className="chat-button" iconClass='fas fa-phone' />
        <Button className="chat-button" iconClass='fas fa-video' />
        <Button className="chat-button" iconClass='fas fa-ellipsis-v' />
      </div>
    </div>
  );
};

export default ChatHeader;

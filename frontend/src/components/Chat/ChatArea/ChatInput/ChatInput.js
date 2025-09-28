import Button from "../../../Button/Button";
import "./ChatInput.scss";

const ChatInput = () => {
  return (
    <div className='chat-input'>
      <input type='text' placeholder='Type your message here...' />
      <Button className='send-btn' iconClass='fas fa-paper-plane' />
    </div>
  );
};

export default ChatInput;

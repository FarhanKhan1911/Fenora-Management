import { useState } from "react";

const MessageInput = ({ addMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      addMessage(message);
      setMessage("");
    }
  };

  return (
    <div className='message-input'>
      <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Type a message' />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;

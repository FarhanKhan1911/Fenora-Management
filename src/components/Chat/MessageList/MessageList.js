const MessageList = ({ messages }) => {
  return (
    <div className='message-list'>
      {messages.map((msg, index) => (
        <div key={index} className='message'>
          <span>{msg}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;

import "./Message.scss";

const Message = ({ type, text }) => {
  return <div className={`message ${type}`}>{text}</div>;
};

export default Message;

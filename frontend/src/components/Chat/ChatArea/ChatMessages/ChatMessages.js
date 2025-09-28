import Message from "./Message/Message";
import "./ChatMessages.scss";

const ChatMessages = () => {
  return (
    <div className='chat-messages'>
      <Message type='received' text='Loy ourin uitittiti 😊' />
      <Message type='sent' text='Eerel is seane a to cherra at your tu rour with to sure g ndoe he te stlog d lossss. 😊' />
      <Message type='received' text='Th dlc Tens – Yor puat is hat pods' />
      <Message type='sent' text='Ui sities ter twist the prolea tinte ther actitir and tergatinee yoper our messtling. Sove the mign. 😊' />
      <Message type='received' text='Ressveal Aom Vit 😊' />
    </div>
  );
};

export default ChatMessages;

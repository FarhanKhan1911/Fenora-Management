import { useNavigate } from "react-router-dom";
import Button from "./Button";

const BackButton = ({ btnName }) => {
  const navigate = useNavigate();
  return (
    <Button name={btnName ? btnName : undefined} className='back-btn' iconClass='fas fa-arrow-left' onClickHandle={() => navigate(-1)} />
  );
};

export default BackButton;

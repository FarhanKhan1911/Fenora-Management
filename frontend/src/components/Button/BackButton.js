import { useNavigate } from "react-router-dom";
import Button from "./Button";

const BackButton = () => {
  const navigate = useNavigate();
  return <Button className='back-btn' iconClass='fas fa-arrow-left' onClickHandle={() => navigate("/dashboard")} />;
};

export default BackButton;

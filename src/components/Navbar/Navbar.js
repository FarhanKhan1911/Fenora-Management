import { useNavigate } from "react-router-dom";
import LogoutButton from "../Auth/Logout/Logout";
import Button from "../Button/Button";
import "./Navbar.scss";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId);
  return (
    <div className='site-header'>
      <div className='header-left'>
        <Button name={"A PLACE YOU CALL HOME"} iconClass='fas fa-home' className='home' onClickHandle={() => navigate("/dashboard")} />
      </div>
      <div className='header-right'>
        <Button
          name={"Chat"}
          className='chat-btn'
          iconClass='far fa-comment'
          isExtraSpace={false}
          onClickHandle={() => navigate(`/chat`)}
        />
        <Button
          name={"Profile"}
          className='profile-btn'
          iconClass='far fa-user'
          isExtraSpace={false}
          onClickHandle={() => navigate(`/profile/${userId}`)}
        />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Navbar;

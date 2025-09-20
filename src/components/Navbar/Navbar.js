import { useNavigate } from "react-router-dom";
import LogoutButton from "../Auth/Logout/Logout";
import Button from "../Button/Button";
import "./Navbar.scss";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId);
  return (
    <header className='site-header'>
      <div className='logo'>A PLACE YOU CALL HOME</div>
      <nav className='navbar'>
        <Button name={"Profile"} onClickHandle={() => navigate(`/profile/${userId}`)} />
        <LogoutButton />
      </nav>
    </header>
  );
};

export default Navbar;

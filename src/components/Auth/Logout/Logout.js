import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserType } from "../../../redux/action";
import Button from "../../Button/Button";
import { LOGOUT_API } from "../../../utils/ApisConstants";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    await axios.post(LOGOUT_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("token");
    dispatch(setUserType(null));
    navigate("/");
  };

  return <Button name={"Logout"} onClickHandle={handleLogout} />;
};

export default LogoutButton;

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserType } from "../../../redux/action";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem("token");

        await fetch("http://localhost:5000/api/auth/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        localStorage.removeItem("token");
        dispatch(setUserType(null));
        navigate("/");
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;

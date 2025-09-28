import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RESET_PASSWORD_API } from "../../../../utils/ApisConstants";
import { userType } from "../../../../redux/redux.type";

const ResetPassword = () => {
  const { id, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(RESET_PASSWORD_API(id, token), { newPassword });
      const data = await response.data;
      if (response.ok) {
        if (data.role === userType.BuyerUser) {
          navigate("/buyer/login");
        } else {
          navigate("/seller/login");
        }
      } else {
        setMessage(data.message || "Error resetting password");
      }
    } catch (error) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input type='password' placeholder='New Password' value={newPassword} required onChange={(e) => setNewPassword(e.target.value)} />
        <input
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type='submit'>Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;

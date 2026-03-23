import axios from "axios";
import { useState } from "react";
import { FORGET_PASSWORD_API } from "../../../utils/ApisConstants";
import "./ForgetPassword.scss";
import BackButton from "../../Button/BackButton";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(FORGET_PASSWORD_API, { email });
      const data = await response.data;
      if (response.ok) {
        setMessage("Password reset link sent to your email.");
      } else {
        setMessage(data.message || "Error sending reset email");
      }
    } catch (error) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <section>
      <div className='forget-password-container'>
        <h2>Forgot Password ?</h2>
        <p>No worries! Enter your email below and we'll send you a link to reset it.</p>
        <form className='reset-form' onSubmit={handleSubmit}>
          <input type='email' placeholder='Enter your email' value={email} required onChange={(e) => setEmail(e.target.value)} />
          <button className='reset-btn' type='submit'>
            Send Reset Link
          </button>
        </form>
        {message && <p>{message}</p>}
        <BackButton btnName={"Back to Login"} />
      </div>
    </section>
  );
};

export default ForgetPassword;

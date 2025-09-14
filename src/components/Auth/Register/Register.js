import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.scss";
import { REGISTER_API } from "../../../utils/ApisConstants";

const Register = ({ userType }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: userType,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const basePath = location.pathname.split("/").slice(0, -1).join("/");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(REGISTER_API, form);
      alert("Registration successful!");
      navigate(`${basePath}/login`);
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className='signup-wrapper'>
      <div className='signup-card'>
        <h2>Join Today</h2>
        <form className='signup-form' onSubmit={handleSubmit}>
          <label htmlFor='name'>Name*</label>
          <input type='text' id='name' name='name' onChange={handleChange} />

          <label htmlFor='email'>Email*</label>
          <input type='email' id='email' name='email' onChange={handleChange} />

          <label htmlFor='password'>Password*</label>
          <input type='password' id='password' />
          <ul className='password-rules'>
            <li>Your password can’t be too similar to your other personal information.</li>
            <li>Your password must contain at least 8 characters.</li>
            <li>Your password can’t be a commonly used password.</li>
            <li>Your password can’t be entirely numeric.</li>
          </ul>

          <label htmlFor='passwordConfirm'>Password confirmation*</label>
          <input type='password' id='passwordConfirm' name='password' onChange={handleChange} />
          <small>Enter the same password as before, for verification.</small>

          <button type='submit'>Sign Up</button>

          <p className='signin-link'>
            Already Have An Account? <Link to={`${basePath}/login`}>Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserType } from "../../../redux/action";
import { LOGIN_API } from "../../../utils/ApisConstants";

const Login = ({ userType }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
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
      const res = await axios.post(LOGIN_API, form);
      localStorage.setItem("token", res.data.token);
      dispatch(setUserType(userType));
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className='login-wrapper'>
      <div className='login-card'>
        <h2>Login</h2>
        <form className='login-form' onSubmit={handleSubmit}>
          <label htmlFor='email'>Email*</label>
          <input type='email' id='email' name='email' onChange={handleChange} />

          <label htmlFor='password'>Password*</label>
          <input type='password' id='password' name='password' onChange={handleChange} />

          <div className='form-actions'>
            <button type='submit'>Login</button>
            <Link to='/forget-password' className='forget-password'>
              Forget password
            </Link>
          </div>

          <p className='signup-link'>
            Need An Account? <Link to={`${basePath}/register`}>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

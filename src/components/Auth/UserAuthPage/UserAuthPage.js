import { Outlet, useLocation } from "react-router-dom";
import "./UserAuthPage.scss";
import Button from "../../Button/Button";

const UserAuthPage = ({ title, subTitle, basePath, bgImg }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === `/${basePath}/login`;
  const isRegisterPage = location.pathname === `/${basePath}/register`;
  return (
    <section className='user-hub-screen'>
      <h2 className='text-center header'>{title}</h2>
      <p>{subTitle}</p>
      {!(isLoginPage || isRegisterPage) ? (
        <div className='user-hub-screen-container'>
          <div className='background-image-wrapper'>
            <img className='user-background' src={bgImg} alt='' />
          </div>
          <div className='button-row'>
            <div className='login-btn-wrapper'>
              <Button name={"Login"} to='login' className='btn login-btn' />
            </div>
            <div className='register-btn-wrapper'>
              <Button name={"Register"} to='register' className='btn register-btn' />
            </div>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </section>
  );
};

export default UserAuthPage;

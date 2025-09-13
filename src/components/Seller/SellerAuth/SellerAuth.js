import Navbar from "../../Navbar/Navbar";
import SellerBg from "../../../media/assets/images/seller.png";
import "./SellerAuth.scss";
import { Link, Outlet, useLocation } from "react-router-dom";

const SellerAuth = ({basePath}) => {
  const location = useLocation();
  const isLoginPage = location.pathname === `/${basePath}/login`;
  const isRegisterPage = location.pathname === `/${basePath}/register`;

  return (
    <section className='seller-screen '>
      <Navbar />
      {!(isLoginPage || isRegisterPage) ? (
        <div className='container'>
          <div className='row'>
            <h2 className='text-center heade'>
              <u>Seller Page</u>
            </h2>
            <div className='col-md-4'></div>
            <div className='col-md-6 col-12'>
              <img className='dev' src={SellerBg} alt='' />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-2'></div>
            <div className='col-md-5'>
              <Link to='login' className='btn text-light btns'>
                Login
              </Link>
            </div>
            <div className='col-md-5'>
              <Link to='register' className='btn text-light btns'>
                Register
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </section>
  );
};

export default SellerAuth;

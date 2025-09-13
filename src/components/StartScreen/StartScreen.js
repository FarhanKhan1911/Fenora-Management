import { Link } from "react-router-dom";
import MainShop from "../../media/assets/images/mainshop.png";
import "./StartScreen.scss";
import Navbar from "../Navbar/Navbar";
import { Fragment } from "react";
import { useAuth } from "../../hooks/useAuth";

const StartScreen = () => {
  const isAuthenticated = useAuth();

  return (
    <section className='start-screen'>
      <Navbar />
      <img src={MainShop} className='bg' alt='' />
      <div className='content' id='home' data-aos='fade-up'>
        <h2>Fenora Management</h2>
        <p>One Step away from browse, and purchase goods or services.</p>
        {isAuthenticated ? (
          <Link className='button' to='/dashboard'>
            {" "}
            <i className='fab fa-sellcast'></i> &nbsp;&nbsp;&nbsp; Go to DashBoard
          </Link>
        ) : (
          <Fragment>
            <Link className='button' to='/buyer'>
              {" "}
              <i className='fas fa-shopping-basket'></i> &nbsp;&nbsp;&nbsp; I'm Buyer
            </Link>
            <Link className='button' to='/seller'>
              {" "}
              <i className='fab fa-sellcast'></i> &nbsp;&nbsp;&nbsp; I'm Seller
            </Link>{" "}
          </Fragment>
        )}
      </div>
    </section>
  );
};

export default StartScreen;

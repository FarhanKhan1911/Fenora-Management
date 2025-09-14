import MainShop from "../../media/assets/images/mainshop.png";
import "./StartScreen.scss";
import Navbar from "../Navbar/Navbar";
import { Fragment } from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../Button/Button";

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
          <Button name={"Go to DashBoard"} iconClass={"fab fa-sellcast"} to='/dashboard' />
        ) : (
          <Fragment>
            <Button name={"I'm Buyer"} iconClass={"fas fa-shopping-basket"} to='/buyer' />
            <Button name={"I'm Seller"} iconClass={"fab fa-sellcast"} to='/seller' />{" "}
          </Fragment>
        )}
      </div>
    </section>
  );
};

export default StartScreen;

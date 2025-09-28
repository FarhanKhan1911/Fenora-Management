import MainShop from "../../media/assets/images/mainshop.png";
import "./StartScreen.scss";
import { Fragment } from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../Button/Button";

const StartScreen = () => {
  const isAuthenticated = useAuth();

  return (
    <section className='start-screen'>
      <div className='overlay'></div>
      <img src={MainShop} className='bg' alt='' />
      <div className='content' id='home' data-aos='fade-up'>
        <h2>Fenora Management</h2>
        <p>Your Siited platform to browse, purchase, and sell goods or services. One Step away from seamless commerce.</p>
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

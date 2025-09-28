import { Fragment } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import StartScreen from "./components/StartScreen/StartScreen";
import UserAuthPage from "./components/Auth/UserAuthPage/UserAuthPage";
import BuyerBg from "./media/assets/images/buyer.png";
import SellerBg from "./media/assets/images/seller.png";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Dashboard from "./components/DashBoard/DashBoard";
import ProfilePage from "./components/Users/ProfilePage/ProfilePage";
import { userType } from "./redux/redux.type";
import { GuestRoute } from "./hooks/useAuth";
import Chat from "./components/Chat/Chat";
import Navbar from "./components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { hideNavbarPatterns } from "./utils/constants";
import ForgetPassword from "./components/Auth/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/Auth/ForgetPassword/ResetPassword/ResetPassword";

function App() {
  const location = useLocation();
  const shouldHideNavbar = hideNavbarPatterns.some((pattern) => pattern.test(location.pathname));

  return (
    <Fragment>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<StartScreen />} />
        <Route
          path='/buyer'
          element={
            <GuestRoute>
              <UserAuthPage title={"Welcome to the Buyer Hub"} basePath={"buyer"} bgImg={BuyerBg} />
            </GuestRoute>
          }
        >
          <Route path='login' element={<Login userType={userType.BuyerUser} />} />
          <Route path='register' element={<Register userType={userType.BuyerUser} />} />
        </Route>
        <Route
          path='/seller'
          element={
            <GuestRoute>
              <UserAuthPage
                title={"Welcome to the Seller Hub"}
                subTitle={"Manage listings, connect with buyers, and grow your business."}
                basePath={"seller"}
                bgImg={SellerBg}
              />
            </GuestRoute>
          }
        >
          <Route path='login' element={<Login userType={userType.SellerUser} />} />
          <Route path='register' element={<Register userType={userType.SellerUser} />} />
        </Route>
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile/:userId' element={<ProfilePage />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </Fragment>
  );
}

export default App;

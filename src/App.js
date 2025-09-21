import { Fragment } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import StartScreen from "./components/StartScreen/StartScreen";
import BuyerAuth from "./components/Buyer/BuyerAuth/BuyerAuth";
import SellerAuth from "./components/Seller/SellerAuth/SellerAuth";
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
              <BuyerAuth basePath={"buyer"} />
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
              <SellerAuth basePath={"seller"} />
            </GuestRoute>
          }
        >
          <Route path='login' element={<Login userType={userType.SellerUser} />} />
          <Route path='register' element={<Register userType={userType.SellerUser} />} />
        </Route>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile/:userId' element={<ProfilePage />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </Fragment>
  );
}

export default App;

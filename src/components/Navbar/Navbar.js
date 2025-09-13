import { Link } from "react-router-dom";
import Logo from "../../media/assets/images/logo.png";

const Navbar = () => {
  return (
    <Link to="/">
      <div className='logo'>
          <img className='logo-img' src={Logo} alt="" />
      </div>
    </Link>
  )
}

export default Navbar

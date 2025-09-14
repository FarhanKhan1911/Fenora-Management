import { Link } from "react-router-dom";

/**
 * Button component
 * @param {Object} props
 * @param {string} props.name - The button text.
 * @param {function} [props.onClickHandle] - Click handler for button.
 * @param {string} [props.className] - CSS class for the button.
 * @param {string} [props.iconClass] - Optional icon class.
 * @param {string} [props.to] - If provided, renders a Link instead of a button.
 * @returns {JSX.Element}
 */

const Button = ({ name, onClickHandle, className = "button", iconClass, to }) => {
  const content = (
    <>
      {iconClass && <i className={iconClass}></i>}
      {name && iconClass && <>&nbsp;&nbsp;&nbsp;</>}
      {name}
    </>
  );

  return to ? (
    <Link to={to} className={className} aria-label={name}>
      {content}
    </Link>
  ) : (
    <button className={className} aria-label={name} onClick={onClickHandle}>
      {content}
    </button>
  );
};

export default Button;

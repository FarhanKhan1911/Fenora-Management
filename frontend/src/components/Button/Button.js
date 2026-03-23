import { Link } from "react-router-dom";
import "./Button.scss";

/**
 * Button component
 * @param {Object} props
 * @param {string} props.name - The button text.
 * @param {function} [props.onClickHandle] - Click handler for button.
 * @param {string} [props.className] - CSS class for the button.
 * @param {string} [props.iconClass] - Optional icon class.
 * @param {string} [props.to] - If provided, renders a Link instead of a button.
 * @param {object} [props.styleItem] - inline styles.
 * @param {HTMLElement} [props.children] - html element.
 * @param {boolean} [props.isExtraSpace] - extra space required.
 * @returns {JSX.Element}
 */

const Button = ({ name, onClickHandle, className = "button", iconClass, to, styleItem, children, isExtraSpace = true }) => {
  const content = (
    <>
      {iconClass && <i className={iconClass}></i>}
      {name && iconClass && isExtraSpace && <>&nbsp;&nbsp;&nbsp;</>}
      {name}
    </>
  );

  return to ? (
    <Link style={styleItem} to={to} className={className} aria-label={name}>
      {content}
    </Link>
  ) : (
    <button style={styleItem} className={className} aria-label={name} onClick={onClickHandle}>
      {children}
      {content}
    </button>
  );
};

export default Button;

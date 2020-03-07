import React from "react";
import PropTypes from "prop-types";

export const styles = `
  inline-block
  shadow
  bg-purple-500
  hover:bg-purple-400
  focus:shadow-outline
  focus:outline-none
  text-white
  font-bold
  py-2
  px-4
  rounded
`;

const Button = ({ type, onClick, children }) => (
  <button className={styles} type={type} onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.oneOf(["submit", "button"]),
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: "button",
  onClick: () => {},
};

export default Button;

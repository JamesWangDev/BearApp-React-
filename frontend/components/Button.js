import React from "react";
import PropTypes from "prop-types";

const defaultBgColor = "bg-purple-500 hover:bg-purple-400";

const getClassName = (color = defaultBgColor) => `
  inline-block
  shadow
  ${color}
  focus:shadow-outline
  focus:outline-none
  text-white
  font-bold
  py-2
  px-4
  rounded
`;

export const styles = getClassName();

const Button = ({ type, onClick, children, bgColor, addStyles }) => {
  const color = bgColor || defaultBgColor;
  const className = getClassName(color);
  return (
    <button
      className={`${className} ${addStyles}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["submit", "button"]),
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  addStyles: PropTypes.string,
  bgColor: PropTypes.string,
};

Button.defaultProps = {
  type: "button",
  onClick: () => {},
  bgColor: "",
  addStyles: "",
};

export default Button;

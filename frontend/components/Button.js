import React from "react";
import PropTypes from "prop-types";

const Button = ({ type, onClick, children, additionalStyles }) => (
  <button
    className={`
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
      ${additionalStyles}
		`}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.oneOf(["submit", "button"]),
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  additionalStyles: PropTypes.string,
};

Button.defaultProps = {
  submit: "button",
  onClick: () => {},
};

export default Button;

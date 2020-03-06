import React from "react";
import PropTypes from "prop-types";

const TextContainer = ({ children, title }) => (
  <div className="mx-1 my-2 leading-relaxed font-semibold">
    {title}
    <div className="ml-2 font-normal text-sm">{children}</div>
  </div>
);

TextContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  title: PropTypes.string,
};

export default TextContainer;

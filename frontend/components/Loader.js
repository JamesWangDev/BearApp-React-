import React from "react";
import PropTypes from "prop-types";

export default function Loader({
  size = 60,
  text = "Loading...",
  addStyles = "",
  children,
}) {
  const baseStyles = "flex flex-col justify-center items-center text-lg my-4";
  const className = `${baseStyles} ${addStyles}`;

  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z" />
      </svg>
      {text}
      {children}

      <style jsx>{`
        svg {
          height: ${size}px;
          width: ${size}px;
        }

        path {
          fill: red;
          stroke: red;
          stroke-width: 1px;
          stroke-dasharray: 69;
          stroke-dashoffset: 0;
          animation: 2s outline 0s infinite alternate;
        }

        @keyframes outline {
          from {
            stroke-dashoffset: 69;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}

Loader.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  text: PropTypes.string,
  addStyles: PropTypes.string,
  children: PropTypes.node,
};

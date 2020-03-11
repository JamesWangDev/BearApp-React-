import React from "react";
import PropTypes from "prop-types";

export default function NavMenuLink({ text, icon, handleClick = () => {} }) {
  return (
    <li className="dropdown__list-item" onClick={handleClick}>
      <span>{icon}</span>
      <span className="ml-2">{text}</span>

      <style jsx>{`
        .dropdown__list-item {
          padding: 12px 24px;
          text-transform: capitalize;
          cursor: pointer;
          display: flex;
          transition: background-color 0.2s;
        }

        .dropdown__list-item:hover {
          background-color: rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </li>
  );
}

NavMenuLink.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  handleClick: PropTypes.func,
};

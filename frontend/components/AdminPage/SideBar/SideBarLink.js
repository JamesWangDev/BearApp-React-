import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

export default function SideBarLink(props) {
  const { needRegistry, userHasRegistry, title, href } = props;

  const { pathname, push } = useRouter();

  const isActive = pathname === href;
  const isDisabled = needRegistry !== userHasRegistry;

  const handleClick = e => {
    e.preventDefault();
    !isDisabled && push(href);
  };

  return (
    <li>
      <a href={href} onClick={handleClick}>
        {title}
      </a>
      <style jsx>{`
        li {
          height: 64px;
          display: flex;
          align-items: center;
          transition: background-color 0.2s;
          background-color: ${isActive
            ? "rgba(0, 0, 0, 0.2)"
            : "rgba(0, 0, 0, 0)"};
        }

        li:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }

        a {
          cursor: ${isDisabled ? "not-allowed" : "pointer"};
          padding: 20px 20px 20px 40px;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </li>
  );
}

SideBarLink.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  needRegistry: PropTypes.bool.isRequired,
  userHasRegistry: PropTypes.bool.isRequired,
};

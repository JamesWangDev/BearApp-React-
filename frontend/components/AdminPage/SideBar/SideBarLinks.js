import React from "react";
import PropTypes from "prop-types";
import SideBarLink from "./SideBarLink";

const links = [
  { href: "/create", title: "Create Registry", needRegistry: false },
  { href: "/admin", title: "Edit Registry", needRegistry: true },
  { href: "/admin/gifts", title: "Manage Gifts", needRegistry: true },
];

export default function SideBarLinks({ userHasRegistry }) {
  return (
    <ul>
      {links.map(link => (
        <SideBarLink
          key={link.href}
          {...link}
          userHasRegistry={userHasRegistry}
        />
      ))}

      <style jsx>{`
        ul {
          padding: 0;
          margin-top: 100px;
          list-style-type: none;
        }
      `}</style>
    </ul>
  );
}

SideBarLinks.propTypes = {
  userHasRegistry: PropTypes.bool.isRequired,
};

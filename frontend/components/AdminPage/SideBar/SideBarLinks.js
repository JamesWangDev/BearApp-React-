import React from "react";
import PropTypes from "prop-types";
import SideBarLink from "./SideBarLink";

const links = [
  { href: "/create", title: "Create Registry", needRegistry: false },
  { href: "/admin", title: "Edit Registry", needRegistry: true },
  { href: "/admin/gifts", title: "Manage Gifts", needRegistry: true },
  { href: "/admin/gifts/create", title: "Add Gift", needRegistry: true },
  {
    href: "/admin/gifts/purchases",
    title: "View Purchases",
    needRegistry: true,
  },
];

export default function SideBarLinks({ userHasRegistry, registryUrl }) {
  return (
    <ul>
      <SideBarLink
        href={`/${registryUrl}`}
        title="View Registry"
        userHasRegistry={userHasRegistry}
        needRegistry
      />
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
  registryUrl: PropTypes.string,
};

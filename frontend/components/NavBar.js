import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "use-auth0-hooks";

import GiftIcon from "@iconscout/react-unicons/icons/uil-gift";
import BarsIcon from "@iconscout/react-unicons/icons/uil-bars";
import TimesIcon from "@iconscout/react-unicons/icons/uil-times";
import { REDIRECTURI } from "../utils";

const StyledItem = ({ children }) => (
  <li className="list-none p-1 mx-2 my-1 text-xl hover:opacity-75 transition-opacity duration-150">
    {children}
  </li>
);

StyledItem.propTypes = {
  children: PropTypes.node,
};

const StyledLink = ({ text, ...props }) => (
  <StyledItem>
    <Link {...props}>
      <a>{text}</a>
    </Link>
  </StyledItem>
);

StyledLink.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
};

export default function NavBar() {
  const [isMenuOpen, setIsOpenMenu] = useState(false);
  const { pathname, query } = useRouter();
  const { isAuthenticated, isLoading, login, logout } = useAuth();

  const menuIconProps = {
    size: "45",
    color: "#9f7aea",
    className: `md:hidden cursor-pointer p-1 rounded-full hover:bg-white transition-all duration-150`,
    onClick: () => setIsOpenMenu(state => !state),
  };

  return (
    <nav className="bg-gray-200 px-3 py-2 text-gray-800">
      <div className="flex flex-col md:flex-row justify-between mx-auto max-w-screen-xl">
        <div className="flex flex-row items-center justify-between text-2xl sm:text-3xl">
          {/* LOGO */}
          <Link href="/">
            <a className="flex items-center">
              <GiftIcon size="40" color="#9f7aea" className="mr-1" />
              Chingu Registry
            </a>
          </Link>
          {/* OPEN/CLOSE MENU ON MOBILE/TABLET */}
          {isMenuOpen ? (
            <TimesIcon {...menuIconProps} />
          ) : (
            <BarsIcon {...menuIconProps} />
          )}
        </div>

        {/* SEARCH BAR WOULD GO HERE */}

        {/* LINKS */}
        <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex flex-col md:flex-row items-center mt-3 md:mt-0 p-2 md:p-0 bg-purple-100 md:bg-gray-200`}
        >
          <StyledLink href="/items" text="View All Registries" />
          <StyledLink href="/admin" text="Admin" />
          <StyledLink href="/docs/api" text="API" />
          {!isLoading && (
            <StyledItem>
              <button
                onClick={() =>
                  isAuthenticated
                    ? logout({ returnTo: { REDIRECTURI } })
                    : login({ appState: { returnTo: { pathname, query } } })
                }
              >
                {isAuthenticated ? "Log Out" : "Register"}
              </button>
            </StyledItem>
          )}
        </ul>
      </div>

      <style jsx>{`
        nav {
          font-family: "Roboto", sans-serif;
          font-variant: small-caps;
        }

        button {
          font-variant: small-caps;
        }
      `}</style>
    </nav>
  );
}

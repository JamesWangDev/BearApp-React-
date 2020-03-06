import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "use-auth0-hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import MenuIcon from "@iconscout/react-unicons/icons/uil-bars";
import CloseMenuIcon from "@iconscout/react-unicons/icons/uil-multiply";
import SearchIcon from "@iconscout/react-unicons/icons/uil-search";
import AccountIcon from "@iconscout/react-unicons/icons/uil-invoice";
import ProfileIcon from "@iconscout/react-unicons/icons/uil-user-circle";
import LogoutIcon from "@iconscout/react-unicons/icons/uil-sign-out-alt";
import colors from "../css/colors";

// Used by ActiveLink to determine the class names for the Link
const getActiveLinkClass = (className = "", pathname, href) => {
  const isActive = pathname === href ? "active" : "";
  return `${className} ${isActive}`.trim();
};

/* Uses the Next.js Link component but adds an 'active' class
 * if the current url matches the href
 */
const ActiveLink = ({ children, ...props }) => {
  const router = useRouter();
  const child = React.Children.only(children);
  const className = getActiveLinkClass(
    child.props.className,
    router.pathname,
    props.href
  );

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

ActiveLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

const AdminPage = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };
  return (
    <div className="grid-container">
      <div className="menu-icon" onClick={() => setIsNavOpen(true)}>
        <MenuIcon />
      </div>
      <header>
        <div className="header__search">
          <SearchIcon />
          Search...
        </div>
        <div className="header__avatar">
          <img
            src="/images/default_profile_image.jpg"
            alt="Profile image"
            onClick={toggleProfileDropdown}
          />
          <div
            className={`dropdown shadow${
              isProfileDropdownOpen ? " dropdown-active" : ""
            }`}
          >
            <ul className="dropdown__list">
              <li className="dropdown__list-item">
                <span className="dropdown__icon">
                  <ProfileIcon />
                </span>
                <span className="dropdown__title ml-2">my profile</span>
              </li>
              <li className="dropdown__list-item">
                <span className="dropdown__icon">
                  <AccountIcon />
                </span>
                <span className="dropdown__title ml-2">my account</span>
              </li>
              <li className="dropdown__list-item" onClick={logout}>
                <span className="dropdown__icon">
                  <LogoutIcon />
                </span>
                <span className="dropdown__title ml-2">logout</span>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <aside className={isNavOpen ? "active" : ""}>
        <div
          className="sidenav__close-icon"
          onClick={() => setIsNavOpen(false)}
        >
          <CloseMenuIcon />
        </div>
        <ul>
          <li>
            <ActiveLink href="/admin">
              <a>Registry details</a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink href="/admin/gifts">
              <a>Gifts</a>
            </ActiveLink>
          </li>
        </ul>
      </aside>
      <main>{children}</main>
      <footer>
        <div className="footer__copyright">&copy; 2020 Bears Team 04</div>
        <div className="footer__signature">
          Made with love for Chingu Voyage 16
        </div>
      </footer>
      <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: 1fr; /* Side nav is hidden on mobile */
          grid-template-rows: 100px 1fr 50px;
          grid-template-areas:
            "header"
            "main"
            "footer";
          height: 100vh;
        }

        .menu-icon {
          position: fixed;
          display: flex;
          top: 25px;
          left: 10px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          z-index: 1;
          cursor: pointer;
          padding: 12px;
          background-color: ${colors.backgroundSecondary};
        }

        /* Give every child element its grid name */
        header {
          grid-area: header;
          background-color: ${colors.backgroundPrimary};
          @apply text-red-500;
        }

        header .header__search {
          display: flex;
          margin-left: 62px;
        }

        header .header__avatar img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
        }

        header .header__avatar .dropdown {
          position: absolute;
          top: 84px;
          right: 4px;
          width: 220px;
          height: auto;
          background-color ${colors.backgroundPrimary};
          border-radius: 4px;
          visibility: hidden;
          opacity: 0;
          transform: translateY(-10px);
          transition: all .3s;
        }

        header .header__avatar .dropdown-active {
          visibility: visible;
          opacity: 1;
          transform: translateY(0);
        }

        header .header__avatar .dropdown .dropdown__list {
          margin: 0;
          padding: 0;
          list-style-type: none;
        }

        header .header__avatar .dropdown .dropdown__list-item {
          padding: 12px 24px;
          text-transform: capitalize;
          cursor: pointer;
          display: flex;
        }

        header .header__avatar .dropdown .dropdown__list-item:hover {
          background-color: rgba(0, 0, 0, 0.2);
        }

        aside {
          grid-area: sidenav;
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 240px;
          position: fixed;
          overflow-y: auto;
          // box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16),
          //   0 0 0 1px rgba(0, 0, 0, 0.08);
          z-index: 2; /* Needs to sit above the menu icon */
          background-color: ${colors.backgroundPrimary};
          transform: translateX(-245px);
          transition: all 0.6s ease-in-out;
        }

        aside.active {
          transform: translateX(0);
        }

        aside .sidenav__close-icon {
          position: absolute;
          visibility: visible;
          top: 8px;
          right: 12px;
          cursor: pointer;
          font-size: 20px;
        }

        aside ul {
          padding: 0;
          margin-top: 100px;
          list-style-type: none;
        }

        aside li {
          height: 64px;
          display: flex;
          align-items: center;
        }

        aside li:hover {
          background-color: rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }

        aside a {
          padding: 20px 20px 20px 40px;
          width: 100%;
          height: 100%;
        }

        aside a.active {
          background-color: rgba(0, 0, 0, 0.2);
        }

        main {
          background-color: ${colors.backgroundSecondary};
        }

        footer {
          grid-area: footer;
        }

        header,
        footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          background-color: ${colors.backgroundPrimary};
        }

        /* Non-mobile styles, 750px breakpoint */
        @media only screen and (min-width: 46.875em) {
          /* Show the sidenav */
          .grid-container {
            grid-template-columns: 240px 1fr; /* Show the side nav for non-mobile screens */
            grid-template-areas:
              "sidenav header"
              "sidenav main"
              "sidenav footer";
          }

          header .header__search {
            margin-left: 0;
          }

          aside {
            position: relative; /* Fixed position on mobile */
            transform: translateX(0);
          }

          aside .sidenav__close-icon {
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  );
};

AdminPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminPage;

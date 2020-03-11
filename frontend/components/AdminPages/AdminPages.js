import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAuth, withLoginRequired } from "use-auth0-hooks";
import useSWR from "swr";
import SearchIcon from "@iconscout/react-unicons/icons/uil-search";
import AccountIcon from "@iconscout/react-unicons/icons/uil-invoice";
import ProfileIcon from "@iconscout/react-unicons/icons/uil-user-circle";
import LogoutIcon from "@iconscout/react-unicons/icons/uil-sign-out-alt";
import { authType } from "../../types";
import colors from "../../css/colors";
import { AUTH0_API_IDENTIFIER, adminFetchIt } from "../../utils";
import SideBar from "./SideBar";

const audience = AUTH0_API_IDENTIFIER;
const fetcher = adminFetchIt;

const AdminPage = withLoginRequired(({ children }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { accessToken, logout, user } = useAuth({ audience });
  const { data } = useSWR(["/registry/admin", accessToken], { fetcher });

  const toggleProfileDropdown = () => setIsProfileDropdownOpen(state => !state);

  if (!user || !data) return null;

  return (
    <div className="grid-container">
      <header>
        <div className="header__search">
          <SearchIcon />
          Search...
        </div>
        <div className="header__avatar">
          <img
            src={user.picture || "/images/default_profile_image.jpg"}
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

      <SideBar data={data} />

      <main>{children(data)}</main>

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
          z-index: 2;
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
            grid-template-columns: 200px 1fr; /* Show the side nav for non-mobile screens */
            grid-template-areas:
              "sidenav header"
              "sidenav main"
              "sidenav footer";
          }

          header .header__search {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
});

AdminPage.propTypes = {
  auth: authType,
  children: PropTypes.func.isRequired,
};

AdminPage.Header = ({ icon, title }) => {
  const Icon = React.cloneElement(icon, { color: "#fff", size: 30 });
  return (
    <header className="header flex py-10 px-5 text-size text-xl">
      <div className="header__icon">{Icon}</div>
      <div className="pl-5">
        <h1>{title}</h1>
      </div>
      <style jsx>{`
        .header .header__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 49px;
          height: 49px;
          border-radius: 8px;
          background-image: linear-gradient(180deg, #6fe3ff 0%, #2fc7f5 100%);
        }

        .header h1 {
          line-height: 49px;
        }
      `}</style>
    </header>
  );
};
AdminPage.Header.displayName = "AdminPage__Header";
AdminPage.Header.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

AdminPage.Main = ({ children }) => <div className="px-5">{children}</div>;
AdminPage.Main.displayName = "AdminPage__Main";
AdminPage.Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminPage;

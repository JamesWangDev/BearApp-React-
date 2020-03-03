import React, { useState } from "react";
import PropTypes from "prop-types";
import MenuIcon from "@iconscout/react-unicons/icons/uil-bars";
import CloseMenuIcon from "@iconscout/react-unicons/icons/uil-multiply";
import SearchIcon from "@iconscout/react-unicons/icons/uil-search";
import colors from "../css/colors";

const AdminPage = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

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
          <img src="/images/default_profile_image.jpg" alt="Profile image" />
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
          <li>Registry details</li>
          <li>Gifts</li>
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
          margin-top: 85px;
          list-style-type: none;
        }

        aside li {
          padding: 20px 20px 20px 40px;
        }

        aside li:hover {
          background-color: rgba(0, 0, 0, 0.2);
          cursor: pointer;
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

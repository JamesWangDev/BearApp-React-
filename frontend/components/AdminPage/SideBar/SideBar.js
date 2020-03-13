import React, { useState } from "react";
import PropTypes from "prop-types";
import MenuIcon from "@iconscout/react-unicons/icons/uil-bars";
import CloseMenuIcon from "@iconscout/react-unicons/icons/uil-multiply";
import colors from "../../../css/colors";
import SideBarLinks from "./SideBarLinks";

export default function SideBar({ data }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <div className="menu-icon" onClick={() => setIsNavOpen(true)}>
        <MenuIcon />
      </div>

      <aside className={isNavOpen ? "active" : ""}>
        <div
          className="sidenav__close-icon"
          onClick={() => setIsNavOpen(false)}
        >
          <CloseMenuIcon />
        </div>
        <SideBarLinks
          registryUrl={data && data.customUrl}
          userHasRegistry={!!data}
        />
      </aside>

      <style jsx>{`
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

        aside {
          grid-area: sidenav;
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 200px;
          position: fixed;
          overflow-y: auto;
          // box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16),
          //   0 0 0 1px rgba(0, 0, 0, 0.08);
          z-index: 2; /* Needs to sit above the menu icon */
          background-color: ${colors.backgroundPrimary};
          transform: translateX(-205px);
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

        /* Non-mobile styles, 750px breakpoint */
        @media only screen and (min-width: 46.875em) {
          aside {
            position: relative; /* Fixed position on mobile */
            transform: translateX(0);
          }

          aside .sidenav__close-icon {
            visibility: hidden;
          }
        }
      `}</style>
    </>
  );
}

SideBar.propTypes = {
  data: PropTypes.any,
};

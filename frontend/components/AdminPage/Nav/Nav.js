import React from "react";
import SearchIcon from "@iconscout/react-unicons/icons/uil-search";
import colors from "../../../css/colors";
import NavMenu from "./NavMenu";

export default function Header() {
  return (
    <header>
      <div className="header__search md:ml-0">
        <SearchIcon className="mr-2" />
        Search feature coming soon...
      </div>

      <NavMenu />

      <style jsx>{`
        header {
          grid-area: header;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          background-color: ${colors.backgroundPrimary};
          @apply text-red-500;
        }

        header .header__search {
          display: flex;
          margin-left: 62px;
        }
      `}</style>
    </header>
  );
}

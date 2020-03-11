import React, { useState } from "react";
import AccountIcon from "@iconscout/react-unicons/icons/uil-invoice";
import ProfileIcon from "@iconscout/react-unicons/icons/uil-user-circle";
import LogoutIcon from "@iconscout/react-unicons/icons/uil-sign-out-alt";
import { useAuth } from "use-auth0-hooks";
import colors from "../../../css/colors";
import NavMenuLink from "./NavMenuLink";

export default function NavMenu() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleProfileDropdown = () => setIsProfileDropdownOpen(state => !state);

  return (
    <div>
      <img
        src={(user && user.picture) || "/images/default_profile_image.jpg"}
        alt="Profile image"
        onClick={toggleProfileDropdown}
        className="h-10 w-10 rounded-full cursor-pointer"
      />
      <div className="dropdown-menu shadow">
        <ul className="m-0 p-0 list-none">
          <NavMenuLink text="my profile" icon={<ProfileIcon />} />
          <NavMenuLink text="my account" icon={<AccountIcon />} />
          <NavMenuLink text="logout" icon={<LogoutIcon />} onClick={logout} />
        </ul>
      </div>

      <style jsx>{`
        .dropdown-menu {
          position: absolute;
          top: 84px;
          right: 4px;
          width: 220px;
          height: auto;
          background-color ${colors.backgroundPrimary};
          border-radius: 4px;
          transition: all .3s;
          visibility: ${isProfileDropdownOpen ? "visible" : "hidden"};
          opacity: ${isProfileDropdownOpen ? 1 : 0};
          transform: translateY(${isProfileDropdownOpen ? "0" : "-10px"});
        }
      `}</style>
    </div>
  );
}

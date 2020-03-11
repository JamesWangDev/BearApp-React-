import React from "react";
import PropTypes from "prop-types";
import { useAuth, withLoginRequired } from "use-auth0-hooks";
import useSWR from "swr";
import { authType } from "../../types";
import colors from "../../css/colors";
import { AUTH0_API_IDENTIFIER, adminFetchIt } from "../../utils";
import SideBar from "./SideBar";
import Nav from "./Nav";
import Footer from "../Footer";

const audience = AUTH0_API_IDENTIFIER;
const fetcher = adminFetchIt;

const AdminPage = withLoginRequired(({ children }) => {
  const { accessToken, user } = useAuth({ audience });
  const { data } = useSWR(["/registry/admin", accessToken], { fetcher });

  if (!user || !data) return null;

  return (
    <div>
      <div className="grid-container">
        <Nav />

        <SideBar data={data} />

        <main className="px-2 pb-10">{children(data)}</main>
      </div>

      <Footer />

      <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: 1fr; /* Side nav is hidden on mobile */
          grid-template-rows: 100px 1fr;
          grid-template-areas: "header" "main";
          z-index: 2;
        }

        main {
          background-color: ${colors.backgroundSecondary};
        }

        /* Non-mobile styles, 750px breakpoint */
        @media only screen and (min-width: 46.875em) {
          /* Show the sidenav */
          .grid-container {
            grid-template-columns: 200px 1fr; /* Show the side nav for non-mobile screens */
            grid-template-areas: "sidenav header" "sidenav main";
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

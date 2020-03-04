import React from "react";
import useSWR from "swr";
import { withAuth, withLoginRequired } from "use-auth0-hooks";
import PropTypes from "prop-types";
import RegistryIcon from "@iconscout/react-unicons/icons/uil-diary";
import AdminPage from "../components/AdminPage";
import { fetchIt } from "../utils";
import { authType } from "../types";

const Admin = ({ registry, auth }) => {
  const { data } = useSWR("/registry", { initialData: registry });
  console.log("data: ", data);
  console.log("auth: ", auth);
  return (
    <AdminPage>
      <header className="header flex py-10 px-5 text-size text-xl">
        <div className="header__icon">
          <RegistryIcon color="#fff" size={30} />
        </div>
        <div className="pl-5">
          <h1>Registry details</h1>
        </div>
      </header>
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
    </AdminPage>
  );
};

Admin.getInitialProps = async () => {
  const registry = await fetchIt("/registry");
  return { registry };
};

Admin.propTypes = {
  registry: PropTypes.any,
  auth: authType,
};

export default withLoginRequired(withAuth(Admin));

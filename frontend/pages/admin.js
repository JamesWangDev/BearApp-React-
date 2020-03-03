import React from "react";
import PropTypes from "prop-types";
import RegistryIcon from "@iconscout/react-unicons/icons/uil-schedule";
import AdminPage from "../components/AdminPage";
import AdminItemsTable from "../components/AdminItemsTable";

import { fetchIt } from "../utils";

const Admin = ({ items }) => {
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
      <div className="flex items-center px-5">
        <AdminItemsTable items={items} />
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
    </AdminPage>
  );
};

Admin.getInitialProps = async () => {
  const items = await fetchIt("/items");
  return { items };
};

Admin.propTypes = {
  items: PropTypes.any,
};

export default Admin;

import React from "react";
import useSWR from "swr";
import { withAuth, withLoginRequired } from "use-auth0-hooks";
import PropTypes from "prop-types";
import RegistryIcon from "@iconscout/react-unicons/icons/uil-gift";
import AdminPage from "../../components/AdminPage";
import AdminItemsTable from "../../components/AdminItemsTable";
import EditItem from "../../components/EditItem";
import { fetchIt } from "../../utils";
import { authType } from "../../types";

const Admin = ({ items, auth }) => {
  const { data } = useSWR("/items", { initalData: items });
  const { user } = auth;
  console.log(user);
  return (
    <AdminPage>
      <header className="header flex py-10 px-5 text-size text-xl">
        <div className="header__icon">
          <RegistryIcon color="#fff" size={30} />
        </div>
        <div className="pl-5">
          <h1>Gifts</h1>
        </div>
      </header>
      <div className="flex items-center px-5">
        <AdminItemsTable items={data} />
      </div>
      <EditItem />
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
  auth: authType,
};

export default withLoginRequired(withAuth(Admin));

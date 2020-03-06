import React from "react";
import useSWR from "swr";
import { withAuth, withLoginRequired } from "use-auth0-hooks";
import PropTypes from "prop-types";
import GiftIcon from "@iconscout/react-unicons/icons/uil-gift";
import AdminPage from "../../components/AdminPage";
import AdminItemsTable from "../../components/AdminItemsTable";
import { fetchIt } from "../../utils";
import { authType } from "../../types";

const Admin = ({ items, auth }) => {
  const { data } = useSWR("/items", { initalData: items });
  const { user } = auth;
  console.log(user);
  return (
    <AdminPage>
      <AdminPage.Header icon={<GiftIcon />} title="New title" />
      <AdminPage.Main>
        <AdminItemsTable items={data} />
      </AdminPage.Main>
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

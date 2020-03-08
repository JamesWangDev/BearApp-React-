import React from "react";
import useSWR from "swr";
import { withAuth } from "use-auth0-hooks";
import PropTypes from "prop-types";
import GiftIcon from "@iconscout/react-unicons/icons/uil-gift";
import AdminPage from "../../components/AdminPage";
import AdminItemsTable from "../../components/AdminItemsTable";
import { fetchIt } from "../../utils";
import { authType } from "../../types";

const Gifts = ({ items, auth }) => {
  const { data } = useSWR("/item/all", { initalData: items });
  return (
    <AdminPage user={auth.user}>
      <AdminPage.Header icon={<GiftIcon />} title="New title" />
      <AdminPage.Main>
        <AdminItemsTable items={data} />
      </AdminPage.Main>
    </AdminPage>
  );
};

Gifts.getInitialProps = async () => {
  const items = await fetchIt("/item/all");
  return { items };
};

Gifts.propTypes = {
  items: PropTypes.any,
  auth: authType,
};

export default withAuth(Gifts);

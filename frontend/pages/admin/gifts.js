import React from "react";
import { withLoginRequired } from "use-auth0-hooks";
import GiftIcon from "@iconscout/react-unicons/icons/uil-gift";
import AdminPage from "../../components/AdminPage";
import AdminItemsTable from "../../components/AdminItemsTable";
import Loader from "../../components/Loader";

const Gifts = () => (
  <AdminPage>
    {registry => (
      <>
        <AdminPage.Header icon={<GiftIcon />} title="Registry Gifts" />
        <AdminPage.Main>
          {/* Pass in our items to the table */}
          {!registry ? <Loader /> : <AdminItemsTable items={registry.items} />}
        </AdminPage.Main>
      </>
    )}
  </AdminPage>
);

export default withLoginRequired(Gifts);

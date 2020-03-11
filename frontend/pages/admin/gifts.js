import React from "react";
import { withLoginRequired } from "use-auth0-hooks";
import GiftIcon from "@iconscout/react-unicons/icons/uil-gift";
import AdminPage from "../../components/AdminPage";
import AdminItemsTable from "../../components/AdminItemsTable";

const Gifts = () => (
  <AdminPage>
    {registry => (
      <>
        <AdminPage.Header icon={<GiftIcon />} title="Registry Gifts" />
        <AdminPage.Main>
          {!registry ? (
            <div>Loading...</div>
          ) : (
            <AdminItemsTable registry={registry} />
          )}
        </AdminPage.Main>
      </>
    )}
  </AdminPage>
);

export default withLoginRequired(Gifts);

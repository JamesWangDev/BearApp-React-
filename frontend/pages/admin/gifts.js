import React from "react";
import { withLoginRequired } from "use-auth0-hooks";
import GiftIcon from "@iconscout/react-unicons/icons/uil-gift";
import AdminPage from "../../components/AdminPage";
import AdminItemsTable from "../../components/AdminItemsTable";

const Gifts = () => {
  return (
    <AdminPage>
      {register => (
        <>
          <AdminPage.Header icon={<GiftIcon />} title="New title" />
          <AdminPage.Main>
            {!register ? (
              <div>Loading...</div>
            ) : (
              <AdminItemsTable items={register.items} />
            )}
          </AdminPage.Main>
        </>
      )}
    </AdminPage>
  );
};

export default withLoginRequired(Gifts);

import React from "react";
import { withLoginRequired } from "use-auth0-hooks";
import GiftIcon from "@iconscout/react-unicons/icons/uil-gift";
import AdminPage from "../../../components/AdminPage";
import ItemForm from "../../../components/ItemForm";

const AdminCreateItem = () => (
  <AdminPage>
    {() => (
      <>
        <AdminPage.Header icon={<GiftIcon />} title="Create Item" />
        <AdminPage.Main>
          <ItemForm isCreating />
        </AdminPage.Main>
      </>
    )}
  </AdminPage>
);

export default withLoginRequired(AdminCreateItem);

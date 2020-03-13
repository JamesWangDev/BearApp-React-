import React from "react";
import { withLoginRequired } from "use-auth0-hooks";
import RegistryIcon from "@iconscout/react-unicons/icons/uil-diary";
import AdminPage from "../components/AdminPage";
import RegistryForm from "../components/RegistryForm";

const Create = () => (
  <AdminPage>
    {() => (
      <>
        <AdminPage.Header icon={<RegistryIcon />} title="Create Registry" />
        <AdminPage.Main>
          <RegistryForm isCreating />
        </AdminPage.Main>
      </>
    )}
  </AdminPage>
);

export default withLoginRequired(Create);

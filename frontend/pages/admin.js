import React from "react";
import { withLoginRequired } from "use-auth0-hooks";
import RegistryIcon from "@iconscout/react-unicons/icons/uil-diary";
import AdminPage from "../components/AdminPage";
import RegistryForm from "../components/RegistryForm";
import Loader from "../components/Loader";
import Header from "../components/Header";

const Admin = () => (
  <>
    <Header title="Registry Home" />
    <AdminPage>
      {registry => (
        <>
          <AdminPage.Header icon={<RegistryIcon />} title="Registry Details" />
          <AdminPage.Main>
            {/* pass our registry to the registry form for updating */}
            {!registry ? <Loader /> : <RegistryForm defaultValues={registry} />}
          </AdminPage.Main>
        </>
      )}
    </AdminPage>
  </>
);

export default withLoginRequired(Admin);

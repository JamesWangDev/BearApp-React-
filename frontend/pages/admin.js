import React from "react";
import { mutate } from "swr";
import { useAuth, withLoginRequired } from "use-auth0-hooks";
import RegistryIcon from "@iconscout/react-unicons/icons/uil-diary";
import AdminPage from "../components/AdminPage";
import RegistryForm from "../components/RegistryForm";
import { AUTH0_API_IDENTIFIER, adminFetchIt } from "../utils";

export default withLoginRequired(function Admin() {
  const { accessToken } = useAuth({ audience: AUTH0_API_IDENTIFIER });

  const submitFunc = registry => formData => {
    mutate("/registry/admin", async () => {
      try {
        const updatedRegistry = await adminFetchIt(
          `/registry/${registry._id}`,
          accessToken,
          { method: "PUT", body: JSON.stringify({ ...formData }) }
        );
        return { ...updatedRegistry, items: registry.items };
      } catch (err) {
        console.log(err);
        return registry;
      }
    });
  };

  return (
    <AdminPage>
      {registry => {
        const onSubmit = submitFunc(registry);
        return (
          <>
            <AdminPage.Header
              icon={<RegistryIcon />}
              title="Registry Details"
            />
            <AdminPage.Main>
              {!registry ? (
                <div>Loading...</div>
              ) : (
                <RegistryForm defaultValues={registry} onSubmit={onSubmit} />
              )}
            </AdminPage.Main>
          </>
        );
      }}
    </AdminPage>
  );
});

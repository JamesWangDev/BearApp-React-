import React from "react";
import { mutate } from "swr";
import { useAuth, withLoginRequired } from "use-auth0-hooks";
import RegistryIcon from "@iconscout/react-unicons/icons/uil-diary";
import AdminPage from "../components/AdminPage";
import RegistryForm from "../components/RegistryForm";
import { AUTH0_API_IDENTIFIER, fetchIt } from "../utils";

const Admin = () => {
  const { accessToken } = useAuth({ audience: AUTH0_API_IDENTIFIER });

  const submitFunc = registry => formData => {
    mutate("/registry/admin", async () => {
      const updatedRegistry = await fetchIt(`/registry/${registry._id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        method: "PUT",
        body: JSON.stringify({
          ...formData,
        }),
      });
      return updatedRegistry;
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
              title="Registry details"
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
};

export default withLoginRequired(Admin);

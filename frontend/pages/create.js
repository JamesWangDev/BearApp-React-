import React from "react";
import { mutate } from "swr";
import { useRouter } from "next/router";
import { useAuth, withLoginRequired } from "use-auth0-hooks";
import RegistryIcon from "@iconscout/react-unicons/icons/uil-diary";
import AdminPage from "../components/AdminPage";
import RegistryForm from "../components/RegistryForm";
import { fetchIt } from "../utils";
import { AUTH0_API_IDENTIFIER } from "../utils";

const Create = () => {
  const { push } = useRouter();
  const { accessToken } = useAuth({ audience: AUTH0_API_IDENTIFIER });

  const onSubmit = async formData => {
    await mutate("/registry/admin", async () => {
      try {
        const registry = await fetchIt(`/registry`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          method: "POST",
          body: JSON.stringify(formData),
        });
        return registry;
      } catch (err) {
        console.error(err);
      }
    });
    push("/admin");
  };

  return (
    <AdminPage isCreating>
      {() => (
        <>
          <AdminPage.Header icon={<RegistryIcon />} title="Create registry" />
          <AdminPage.Main>
            <RegistryForm onSubmit={onSubmit} />
          </AdminPage.Main>
        </>
      )}
    </AdminPage>
  );
};

export default withLoginRequired(Create);

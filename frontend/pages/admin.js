import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { withAuth, useAuth, withLoginRequired } from "use-auth0-hooks";
import RegistryIcon from "@iconscout/react-unicons/icons/uil-diary";
import AdminPage from "../components/AdminPage";
import InputText from "../components/InputText";
import Button from "../components/Button";
import { fetchIt, adminFetchIt } from "../utils";
import { authType } from "../types";
import { AUTH0_API_IDENTIFIER } from "../utils";

const REGISTRY_STATUS = {
  CREATED: "CREATED",
  DOES_NOT_EXIST: "DOES_NOT_EXIST",
};

const Admin = ({ auth }) => {
  const { register, handleSubmit, errors, reset, formState } = useForm();
  const { accessToken } = useAuth({ audience: AUTH0_API_IDENTIFIER });
  const [registryStatus, setRegistryStatus] = useState();
  const { data, error } = useSWR(
    registryStatus === REGISTRY_STATUS.DOES_NOT_EXIST
      ? null
      : ["/registry/admin", accessToken],
    {
      fetcher: adminFetchIt,
    }
  );

  // Prevent useSWR from trying to refetch the registry if it is not yet created
  useEffect(() => {
    if (
      error &&
      error.message === "You don't have a registry" &&
      registryStatus !== REGISTRY_STATUS.CREATED
    ) {
      setRegistryStatus(REGISTRY_STATUS.DOES_NOT_EXIST);
    }
  }, [error]);

  useEffect(() => {
    if (!formState.dirty) {
      reset(data);
    }
    if (data && data._id) {
      setRegistryStatus(REGISTRY_STATUS.CREATED);
    }
  }, [data]);

  const onSubmit = formData => {
    if (registryStatus === REGISTRY_STATUS.DOES_NOT_EXIST) {
      mutate("/registry/admin", async () => {
        const registry = await fetchIt(`/registry`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          method: "POST",
          body: JSON.stringify(formData),
        });
        setRegistryStatus(REGISTRY_STATUS.CREATED);
        return registry;
      });
    } else {
      mutate("/registry/admin", async () => {
        const registry = await fetchIt(`/registry/${data._id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          method: "PUT",
          body: JSON.stringify({
            ...data,
            ...formData,
          }),
        });
        return registry;
      });
    }
  };

  return (
    <AdminPage user={auth.user}>
      <AdminPage.Header icon={<RegistryIcon />} title="Registry details" />
      <AdminPage.Main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            id="title"
            error={errors.title}
            ref={register({ required: "Title is required" })}
          >
            Title
          </InputText>
          <InputText
            id="description"
            error={errors.description}
            type="textarea"
            ref={register}
          >
            Description
          </InputText>
          <InputText
            id="p1FullName"
            error={errors.p1FullName}
            ref={register({ required: "Partner 1 name is required" })}
          >
            Partner 1 full name
          </InputText>
          <InputText
            id="p2FullName"
            error={errors.p2FullName}
            ref={register({ required: "Partner 2 name is required" })}
          >
            Partner 2 full name
          </InputText>
          <InputText
            id="email"
            error={errors.email}
            ref={register({ required: "Email is required" })}
          >
            Email
          </InputText>
          <InputText id="phoneNumber" error={errors.phone} ref={register}>
            Phone number
          </InputText>
          <InputText
            id="tyMessage"
            type="text"
            error={errors.tyMessage}
            ref={register}
          >
            Thank you message
          </InputText>
          <InputText
            id="customUrl"
            error={errors.customUrl}
            ref={register({ required: "Custom URL is required" })}
          >
            Custom URL
          </InputText>
          <Button type="submit">Submit</Button>
        </form>
      </AdminPage.Main>
    </AdminPage>
  );
};

Admin.propTypes = {
  auth: authType,
};

export default withLoginRequired(withAuth(Admin));

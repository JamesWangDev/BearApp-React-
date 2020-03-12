import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { adminFetchIt, AUTH0_API_IDENTIFIER } from "../utils";
import { useForm } from "react-hook-form";
import { useAuth } from "use-auth0-hooks";
import InputText from "./InputText";
import Button from "./Button";
import { useSnacks } from "./Snack";

export default function RegistryForm({
  defaultValues = {},
  isCreating = false,
}) {
  const { push } = useRouter();
  const { accessToken, user } = useAuth({ audience: AUTH0_API_IDENTIFIER });
  const { openSnack } = useSnacks();

  const method = isCreating ? "POST" : "PUT";
  const email = isCreating ? user.email : defaultValues.email || "";

  const { register, handleSubmit, errors } = useForm({
    defaultValues: { email, ...defaultValues },
  });

  const onSubmit = async formData => {
    await mutate(
      ["/registry/admin", accessToken],
      // the registry below is the cached version from AdminPage
      async registry => {
        // gets the correct api url
        const url = `/registry${!isCreating ? `/${registry._id}` : ""}`;

        try {
          const changedRegistry = await adminFetchIt(url, accessToken, {
            method,
            body: JSON.stringify(formData),
          });
          const modifiedRegistry = {
            ...changedRegistry,
            // we don't want any array of the item STRINGs, we ...
            // ... want the item OBJECTs still
            items: isCreating ? [] : registry.items,
          };

          openSnack(
            `Success! ${isCreating ? "Created" : "Updated"} your registry`,
            "success"
          );

          return modifiedRegistry;
        } catch (err) {
          console.log(err);
          openSnack(
            `Sorry! We couldn't ${
              isCreating ? "create" : "edit"
            } that registry`,
            "error"
          );
          return registry;
        }
      }
    );

    if (isCreating) {
      push("/admin");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        id="title"
        error={errors.title}
        ref={register({ required: "Title is required" })}
      >
        Title
      </InputText>
      <InputText
        type="textarea"
        id="description"
        error={errors.description}
        ref={register}
      >
        Description
      </InputText>
      <InputText
        id="p1FullName"
        error={errors.p1FullName}
        ref={register({ required: "Partner 1 name is required" })}
      >
        Partner 1 Full Name
      </InputText>
      <InputText
        id="p2FullName"
        error={errors.p2FullName}
        ref={register({ required: "Partner 2 name is required" })}
      >
        Partner 2 Full Name
      </InputText>
      <InputText
        type="email"
        id="email"
        error={errors.email}
        ref={register({ required: "Email is required" })}
      >
        Email
      </InputText>
      <InputText
        type="tel"
        id="phoneNumber"
        error={errors.phone}
        ref={register}
      >
        Phone Number
      </InputText>
      <InputText id="tyMessage" error={errors.tyMessage} ref={register}>
        Thank You Message
      </InputText>
      <InputText
        id="customUrl"
        error={errors.customUrl}
        ref={register({ required: "Custom URL is required" })}
      >
        Custom URL
      </InputText>
      <InputText id="coverImage" error={errors.coverImage} ref={register}>
        Cover Image
      </InputText>
      <Button type="submit">Submit</Button>
    </form>
  );
}

RegistryForm.propTypes = {
  defaultValues: PropTypes.object,
  isCreating: PropTypes.bool,
};

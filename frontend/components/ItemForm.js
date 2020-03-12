import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useAuth } from "use-auth0-hooks";
import { mutate } from "swr";
import { useForm } from "react-hook-form";

import InputText from "./InputText";
import Button from "./Button";
import Link from "./Link";
import { adminFetchIt, AUTH0_API_IDENTIFIER } from "../utils";
import { useSnacks } from "./Snack";

const audience = AUTH0_API_IDENTIFIER;

export default function ItemForm({ defaultValues = {}, isCreating = false }) {
  const method = isCreating ? "POST" : "PUT";

  const { push } = useRouter();
  const { accessToken } = useAuth({ audience });
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues,
  });
  const { openSnack } = useSnacks();

  //      update and create url structure
  // PUT  - api/item/:itemId/registry/:registryId
  // POST - api/item/        registry/:registryId

  const onSubmit = formData => {
    mutate(["/registry/admin", accessToken], async registry => {
      // creates a url based on if its we're creating/updating
      const url = `/item${isCreating ? "" : `/${defaultValues._id}`}/registry/${
        registry._id
      }`;

      try {
        const changedItem = await adminFetchIt(url, accessToken, {
          method,
          body: JSON.stringify(formData),
        });

        const updatedItems = isCreating
          ? // adds the new item to the items array
            [...registry.items, changedItem]
          : // updates the items array with the updated item
            registry.items.map(item =>
              item._id === changedItem._id ? changedItem : item
            );

        // this will reset the form to allow the user to create ...
        // ... multiple items or return the user to see their updated gifts
        if (isCreating) {
          openSnack("Success! Added your gift", "success");
          reset(defaultValues);
        } else {
          openSnack("Success! Updated your gift", "success");
          push("/admin/gifts");
        }

        return { ...registry, items: updatedItems };
      } catch (err) {
        console.log(err);
        openSnack(
          `Sorry! We couldn't ${isCreating ? "create" : "edit"} that gift`,
          "error"
        );
        return registry;
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        id="name"
        error={errors.name}
        ref={register({ required: "Name is required" })}
      >
        Name
      </InputText>
      <InputText
        type="textarea"
        id="description"
        error={errors.description}
        ref={register({ required: "Description is required" })}
      >
        Description
      </InputText>
      <InputText
        type="number"
        min="0"
        id="price"
        error={errors.price}
        ref={register({ required: "Price is required" })}
      >
        Price
      </InputText>
      <InputText id="link" error={errors.link} ref={register}>
        Link
      </InputText>
      <InputText id="image" error={errors.image} ref={register}>
        Image
      </InputText>
      <Button type="submit" addStyles="mr-2">
        {isCreating ? "Submit" : "Save"}
      </Button>
      <Link href="/admin/gifts">Cancel</Link>
    </form>
  );
}

ItemForm.propTypes = {
  defaultValues: PropTypes.object,
  isCreating: PropTypes.bool,
};

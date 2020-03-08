import React from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import InputText from "./InputText";
import Button from "./Button";
import { fetchIt } from "../utils";

const EditItem = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = async formData => {
    mutate("/items", async items => {
      const newItem = await fetchIt("/item", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      return [...items, newItem];
    });
    reset();
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
        id="description"
        error={errors.description}
        type="textarea"
        ref={register}
      >
        Description
      </InputText>
      <InputText
        id="price"
        type="number"
        error={errors.price}
        ref={register({ required: "Price is required" })}
      >
        Price
      </InputText>
      <InputText
        id="link"
        error={errors.link}
        ref={register({ required: "Link is required" })}
      >
        Link
      </InputText>
      <InputText id="image" error={errors.image} ref={register}>
        Image
      </InputText>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default EditItem;

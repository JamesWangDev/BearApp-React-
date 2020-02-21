import React from "react";
import { useForm } from "react-hook-form";
import fetch from "isomorphic-fetch";
import InputText from "./InputText";
import Button from "./Button";
import { getBackendAPI } from "../utils";

const EditItem = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async data => {
    console.log(data);
    const response = await fetch(getBackendAPI("item"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response);
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
      <Button>Submit</Button>
    </form>
  );
};

export default EditItem;

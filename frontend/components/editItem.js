import React from "react";
import { useForm } from "react-hook-form";
import fetch from "isomorphic-fetch";
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
      <label>Name</label>
      <input name="name" ref={register({ required: true })} />
      {errors.name && "Name is required"}
      <label>Description</label>
      <input name="description" type="textarea" ref={register} />
      <label>Price</label>
      <input name="price" type="number" ref={register({ required: true })} />
      {errors.price && "Price is required"}
      <label>Link</label>
      <input name="link" ref={register({ required: true })} />
      {errors.link && "Link is required"}
      <label>Image</label>
      <input name="imagelink" ref={register} />
      <input type="submit" />
    </form>
  );
};

export default EditItem;

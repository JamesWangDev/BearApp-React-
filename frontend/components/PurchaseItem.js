import React, { createRef } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import InputText from "./InputText";
import Button from "./Button";
import { itemType } from "../types";

const PurchaseItem = ({
  // _id,
  name,
  description,
  link,
  // isPurchased,
  // isReserved,
  price,
  image,
  handleClose,
}) => {
  const { register, handleSubmit, errors } = useForm();
  const formData = data => {
    console.log(data);
  };
  const onSubmit = e => {
    e.preventDefault();
    formRef.current.dispatchEvent(new Event("submit"));
  };
  const formRef = createRef();
  return (
    <div className="">
      <div>
        <img
          className="max-h-full max-w-full my-0 mx-auto"
          src={image || "/images/default_gift_image-10.jpg"}
          alt={`${name} image`}
        />
      </div>
      <div className="px-10 pt-10 pb-2 flex justify-between">
        <div>
          <h1 className="text-xl">{name}</h1>
          <div className="text-green-500">${price}</div>
        </div>
        <div>
          <a
            href={link}
            className="p-2 border border-solid cursor-pointer rounded"
          >
            View online
          </a>
        </div>
      </div>
      <div className="px-10 pt-2 pb-4 border border-solid text-gray-700">
        <div className="" title={description}>
          {description}
        </div>
      </div>
      <div className="bg-gray-200 p-10 text-gray-700">
        <h2>Thank you for gifting this gift!</h2>
        <p>Please fill out the details below to gift this gift.</p>
        <form onSubmit={handleSubmit(formData)} ref={formRef}>
          <InputText
            id="name"
            error={errors.name}
            ref={register({ required: "Name is required" })}
          >
            Name
          </InputText>
          <InputText
            id="email"
            error={errors.email}
            ref={register({ required: "Email is required" })}
          >
            Email
          </InputText>
          <InputText id="message" type="textarea" ref={register}>
            Message
          </InputText>
          <InputText
            id="amount"
            type="number"
            error={errors.amount}
            ref={register({
              required: "Price is required",
              max: {
                value: price,
                message: `You've exceeded the price of the gift!`,
              },
              min: {
                value: 1,
                message: "You must gift at least $1",
              },
            })}
          >
            Amount ($)
          </InputText>
          <input type="submit" value="submit" />
          <div className="flex justify-around">
            <Button onClick={onSubmit}>Checkout</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

PurchaseItem.propTypes = {
  ...itemType,
  handleClose: PropTypes.func.isRequired,
};

export default PurchaseItem;

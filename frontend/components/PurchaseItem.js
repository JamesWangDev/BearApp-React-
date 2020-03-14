import React, { createRef } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import PropTypes from "prop-types";
import { useSnacks } from "./Snack";
import InputText from "./InputText";
import Button from "./Button";
import { fetchIt } from "../utils";
import { itemType } from "../types";

const PurchaseItem = ({
  _id,
  name,
  description,
  link,
  // isPurchased,
  // isReserved,
  price,
  image,
  handleClose,
  swrKey,
}) => {
  const { register, handleSubmit, errors } = useForm();
  const { openSnack } = useSnacks();

  const handleFormSubmit = formData => {
    //      update and create url structure
    // PUT  - api/item/:itemId/registry/:registryId
    // POST - api/item/        registry/:registryId

    mutate(swrKey, async registry => {
      // creates a url based on if its we're creating/updating
      const url = `/item/${_id}/registry/${registry._id}/purchase`;

      try {
        const changedItem = await fetchIt(url, {
          method: "PUT",
          body: JSON.stringify(formData),
        });

        const updatedItems = registry.items.map(item =>
          item._id === changedItem._id ? changedItem : item
        );

        handleClose();
        openSnack("You successfully bought this gift!", "success");
        return { ...registry, items: updatedItems };
      } catch (err) {
        console.log(err);
        openSnack("Something went wrong. The gift was not purchased.", "error");
        return registry;
      }
    });
  };

  // For some reason, submitting the form inside the modal doesn't work.
  // I think it has something to do with this form being inside a
  // react portal, meaning it's injected when the modal is opened.
  // This function fires the normal form onSubmit event.
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
        <form onSubmit={handleSubmit(handleFormSubmit)} ref={formRef}>
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
            id="pricePaid"
            type="number"
            error={errors.pricePaid}
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
  swrKey: PropTypes.string.isRequired,
};

export default PurchaseItem;

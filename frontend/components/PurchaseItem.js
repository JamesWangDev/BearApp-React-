import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import InputText from "./InputText";
import Button from "./Button";
import { useSnacks } from "./Snack";
import { itemType } from "../types";
import { fetchIt } from "../utils";

const PurchaseItem = ({
  _id,
  name,
  description,
  link,
  image,
  handleClose,
  priceLeft,
}) => {
  const { query } = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const { openSnack } = useSnacks();
  const formRef = useRef();

  const onFormSubmit = async formData => {
    mutate(`/registry/${query.registryUrl}`, async registry => {
      console.log(registry);
      try {
        const updatedItem = await fetchIt(`/item/${_id}`, {
          method: "POST",
          body: JSON.stringify(formData),
        });
        const updatedItems = registry.items.map(item =>
          item._id === _id ? updatedItem : item
        );
        openSnack("Success! Processed your payment.", "success");
        handleClose();
        return { ...registry, items: updatedItems };
      } catch (err) {
        console.log(err);
        openSnack("Sorry! Couldn't process your payment", "error");
        handleClose();
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

  return (
    <div>
      <div>
        <img
          className="max-h-full max-w-full my-0 mx-auto"
          src={image || "/images/default_gift_image-10.jpg"}
          alt={`${name} image`}
        />
      </div>

      <div className="px-10 pt-10 pb-2 flex justify-between">
        <div>
          <h1 className="text-xl mb-2">{name}</h1>
          <div className="text-green-500">
            <span className="text-gray-700">Remaining Goal: </span>${priceLeft}
          </div>
        </div>
        <div>
          <a
            href={link || null}
            className={`p-2 border border-solid cursor-pointer rounded ${
              link ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View online
          </a>
        </div>
      </div>

      <div className="px-10 py-4 border border-solid text-gray-700">
        {description}
      </div>

      <div className="bg-gray-200 py-6 px-10 text-gray-700">
        <div className="text-center mb-6">
          <h2 className="text-xl">Thank you for choosing to gift this!</h2>
          <p className="my-2">
            Please fill out the details below to gift this gift.
          </p>
          <span className="italic text-sm">
            <span className="font-bold">Note: </span>
            only the amount is required. Feel free to gift anonymously.
          </span>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} ref={formRef}>
          <InputText id="name" error={errors.name} ref={register}>
            Name
          </InputText>
          <InputText
            type="email"
            id="email"
            error={errors.email}
            ref={register}
          >
            Email
          </InputText>
          <InputText
            type="textarea"
            id="message"
            error={errors.message}
            ref={register}
          >
            Message
          </InputText>
          <InputText
            type="number"
            id="pricePaid"
            error={errors.pricePaid}
            ref={register({
              required: "Price is required",
              max: {
                value: priceLeft,
                message: `You've exceeded the remaining price of the gift!`,
              },
              min: {
                value: 1,
                message: "You must gift at least $1",
              },
            })}
          >
            Amount ($)
          </InputText>
          <div className="flex flex-col sm:flex-row justify-center">
            <Button onClick={onSubmit} addStyles="w-full sm:w-1/3 sm:mr-3">
              Checkout
            </Button>
            <Button
              onClick={handleClose}
              addStyles="w-full sm:w-1/3"
              bgColor="bg-red-500 hover:bg-red-400"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

PurchaseItem.propTypes = {
  ...itemType,
  handleClose: PropTypes.func.isRequired,
  priceLeft: PropTypes.number.isRequired,
};

export default PurchaseItem;

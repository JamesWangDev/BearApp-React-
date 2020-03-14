import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import { itemType } from "../types";
import PurchaseItem from "./PurchaseItem";

const classItem = `
group
w-full
max-w-sm
sm:max-w-md
sm:w-1/2
md:w-1/3
lg:w-1/4
xl:w-1/6
mb-4
p-2
transform
hover:scale-105
transition-transform
duration-100
cursor-pointer
`;

export default function Item(props) {
  const { name, price, image, totalPurchased, swrKey } = props;

  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);

  const priceLeft = price - totalPurchased;
  const isBought = priceLeft < 1;

  // don't open the modal if the item is already purchased
  const handleOpen = () => setIsPurchaseOpen(!isBought);
  const handleClose = () => setIsPurchaseOpen(false);

  return (
    <>
      <div className={classItem} onClick={handleOpen}>
        <div className="max-w-sm overflow-hidden shadow-lg relative">
          <img
            className=" h-48 w-auto my-0 mx-auto"
            src={image || "/images/default_gift_image-10.jpg"}
            alt={name}
          />

          {/* Item info */}
          <div className="px-6 py-2">
            <div className="font-bold text-xl mb-2 text-center">{name}</div>
            <p className="text-base text-center text-green-500">
              {isBought ? (
                "Bought"
              ) : (
                <>
                  <span className="text-gray-700">Remaining Goal: </span>$
                  {priceLeft}
                </>
              )}
            </p>
          </div>
        </div>

        {/* Partially see through hovered cover  */}
        <div className="bg-white absolute inset-0 m-2 text-xl text-black font-bold opacity-0 flex items-center justify-center transition-opacity duration-100 group-hover:opacity-75">
          {isBought ? "Goal price reached" : "Click to purchase"}
        </div>

        {/* Colored bottom border effect */}
        <hr
          className={`border-solid border ${
            isBought ? "border-green-600" : "border-blue-600"
          }`}
        />
      </div>

      <Modal isOpen={isPurchaseOpen} handleClose={handleClose}>
        <PurchaseItem
          handleClose={handleClose}
          {...props}
          priceLeft={priceLeft}
          swrKey={swrKey}
        />
      </Modal>
    </>
  );
}

Item.propTypes = {
  swrKey: PropTypes.string.isRequired,
  ...itemType,
};

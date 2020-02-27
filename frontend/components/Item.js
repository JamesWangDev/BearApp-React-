import React, { useState } from "react";
import Modal from "./Modal";
import { itemType } from "../types";
import PurchaseItem from "./PurchaseItem";

const classItem = `
group
w-full
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

const Item = props => {
  const {
    // _id,
    name,
    // description,
    // link,
    // isPurchased,
    // isReserved,
    price,
    image,
  } = props;
  const [isEditing, setIsEditing] = useState(false);
  const handleOnClick = () => {
    setIsEditing(true);
  };
  const handleClose = () => {
    setIsEditing(false);
  };
  return (
    <>
      <div className={classItem} onClick={handleOnClick}>
        <div className="max-w-sm rounded overflow-hidden shadow-lg relative bg-green group-hover:bg-red">
          <div className="image-height">
            <img
              className="max-h-full max-w-full my-0 mx-auto"
              src={image || "/images/default_gift_image-10.jpg"}
              alt={`${name} image`}
            />
          </div>
          <div className="px-6 py-2">
            <div className="font-bold text-xl mb-2 text-center">{name}</div>
            <p className="text-gray-700 text-base text-center">${price}</p>
          </div>
          <style jsx>{`
            .image-height {
              height: 208px;
            }
          `}</style>
        </div>
        <div className="bg-white absolute inset-0 m-2 opacity-0 flex items-center justify-center transition-opacity duration-100 group-hover:opacity-75">
          Click to purchase
        </div>
        <div className="border-solid border border-black" />
      </div>
      <Modal isOpen={isEditing} handleClose={handleClose}>
        <PurchaseItem handleClose={handleClose} {...props} />
      </Modal>
    </>
  );
};

Item.propTypes = {
  ...itemType,
};

export default Item;

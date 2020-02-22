import React, { useState } from "react";
import fetch from "isomorphic-fetch";
import PropTypes from "prop-types";
import Button from "./Button";
import Modal from "./Modal";
import { itemType } from "../types";
import { getBackendAPI } from "../utils";

const deleteItem = async id => {
  await fetch(`${getBackendAPI("item")}/${id}`, {
    method: "DELETE",
  });
};

const Item = ({
  _id,
  name,
  description,
  link,
  isPurchased,
  isReserved,
  price,
  image,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleOnClick = () => {
    setIsEditing(true);
  };
  const handleDelete = e => {
    e.preventDefault();
    e.stopPropagation();
    deleteItem(_id);
  };
  return (
    <>
      <div
        className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer"
        onClick={handleOnClick}
      >
        <img
          className="w-full h-30 my-0 mx-auto image-height"
          src={image || "/images/default_gift_image-10.jpg"}
          alt={`${name} image`}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            #photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            #travel
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            #winter
          </span>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
        <style jsx>{`
          image-height {
            height: 273px;
          }
        `}</style>
      </div>
      <div className="itemContainer" onClick={handleOnClick}>
        <style jsx>{`
          .itemContainer {
            border: 1px solid black;
          }
          image-height {
            height: 273px;
          }
          .deleteButton {
            border: 1px solid black;
          }
        `}</style>
      </div>
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <Item
          _id={_id}
          name={name}
          description={description}
          link={link}
          isPurchased={isPurchased}
          isReserved={isReserved}
          price={price}
          image={image}
        />
      </Modal>
    </>
  );
};

Item.propTypes = {
  ...itemType,
};

const ItemModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose}></Modal>
);

ItemModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Item;

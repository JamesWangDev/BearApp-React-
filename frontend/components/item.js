import React, { useState } from "react";
import fetch from "isomorphic-fetch";
import PropTypes from "prop-types";
import Modal from "./modal";
import { itemType } from "../types";
import { getBackendAPI } from "../utils";

const handleDelete = async id => {
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
  return (
    <>
      <div className="itemContainer" onClick={handleOnClick}>
        <div>Name: {name}</div>
        <div>Description: {description}</div>
        <div>Link: {link}</div>
        <div>Is Purchased: {isPurchased ? "true" : "false"}</div>
        <div>Is Reserved: {isReserved ? "true" : "false"}</div>
        <div>Price: {price}</div>
        <img alt={`${name} image`} height={100} src={image} />
        <button className="deleteButton" onClick={() => handleDelete(_id)}>
          Delete
        </button>
        <style jsx>{`
          .itemContainer {
            border: 1px solid black;
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

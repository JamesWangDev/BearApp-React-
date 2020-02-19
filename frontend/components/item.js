import React from "react";
import { itemType } from "../types";
import fetch from "isomorphic-fetch";
import { getBackendAPI } from "../utils";

const handleDelete = async id => {
  await fetch(`${getBackendAPI("item")}/${id}`, {
    method: "DELETE",
  });
};

function Item({
  _id,
  name,
  description,
  link,
  isPurchased,
  isReserved,
  price,
  image,
}) {
  return (
    <div className="itemContainer">
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
  );
}

Item.propTypes = {
  ...itemType,
};

export default Item;

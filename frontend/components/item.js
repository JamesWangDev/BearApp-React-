import React from "react";
import { itemType } from "../types";

function Item({
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
      <style jsx>{`
        .itemContainer {
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

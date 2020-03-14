import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";
import { itemType } from "../types";

function Items({ items, swrKey }) {
  return (
    <div className="flex flex-wrap">
      {items.map(item => (
        <Item key={item._id} swrKey={swrKey} {...item} />
      ))}
    </div>
  );
}

Items.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(itemType)),
  swrKey: PropTypes.string.isRequired,
};

export default Items;
export { itemType };

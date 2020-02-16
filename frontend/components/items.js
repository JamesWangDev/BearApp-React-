import React from "react";
import PropTypes from "prop-types";
import Item from "./item";
import { itemType } from "../types";

function Items({ items }) {
  return (
    <div>
      {items.map(item => (
        <Item key={item._id} {...item} />
      ))}
    </div>
  );
}

Items.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(itemType)),
};

export default Items;
export { itemType };

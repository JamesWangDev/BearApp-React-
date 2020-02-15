import React from "react";
import PropTypes from "prop-types";
import { itemType } from "../pages/items";

function Items({ items }) {
  return (
    <div>
      {items.map(item => (
        <div key={item.name}>{item.name}</div>
      ))}
    </div>
  );
}

Items.propTypes = {
  items: PropTypes.arrayOf(itemType),
};

export default Items;

import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";
import { itemType } from "../types";

function Items({ items }) {
  return (
    <div className="flex flex-wrap">
      {items.map(item => (
        <div
          key={item._id}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4"
        >
          <Item {...item} />
        </div>
      ))}
    </div>
  );
}

Items.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(itemType)),
};

export default Items;
export { itemType };

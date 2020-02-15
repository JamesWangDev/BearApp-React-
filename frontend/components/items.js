import React from "react";
import PropTypes from "prop-types";

const itemType = PropTypes.shape({
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.string,
  isPurchased: PropTypes.bool,
  isReserved: PropTypes.bool,
  addedOn: PropTypes.number,
  reservedOn: PropTypes.number,
  purchasedOn: PropTypes.number,
});
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
export { itemType };

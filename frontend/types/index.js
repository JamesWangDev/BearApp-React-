import PropTypes from "prop-types";

export const itemType = {
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  link: PropTypes.string,
  image: PropTypes.string,
  isPurchased: PropTypes.bool,
  isReserved: PropTypes.bool,
  addedOn: PropTypes.string,
  reservedOn: PropTypes.string,
  purchasedOn: PropTypes.string,
};

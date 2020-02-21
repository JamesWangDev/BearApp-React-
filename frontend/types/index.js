import PropTypes from "prop-types";

export const itemType = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.string,
  isPurchased: PropTypes.bool.isRequired,
  isReserved: PropTypes.bool.isRequired,
  addedOn: PropTypes.string,
  reservedOn: PropTypes.string,
  purchasedOn: PropTypes.string,
};

export const formErrorType = PropTypes.shape({
  type: PropTypes.string.isRequired,
  message: PropTypes.string,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
});

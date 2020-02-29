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

export const registryType = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tyMessage: PropTypes.string,
  p1FullName: PropTypes.string.isRequired,
  p2FullName: PropTypes.string.isRequired,
  weddingDate: PropTypes.instanceOf(Date),
  phoneNumber: PropTypes.number,
  email: PropTypes.email,
  userId: PropTypes.string.isRequired,
  customUrl: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(itemType)),
  coverImage: PropTypes.string,
};

export const formErrorType = PropTypes.shape({
  type: PropTypes.string.isRequired,
  message: PropTypes.string,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
});

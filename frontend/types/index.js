import PropTypes from "prop-types";

const { string, number, bool, func, oneOfType, any, shape, date } = PropTypes;

export const itemType = {
  name: string.isRequired,
  description: string.isRequired,
  price: number.isRequired,
  link: string.isRequired,
  image: string,
  isPurchased: bool.isRequired,
  isReserved: bool.isRequired,
  addedOn: string,
  reservedOn: string,
  purchasedOn: string,
};

export const formErrorType = shape({
  type: string.isRequired,
  message: string,
  ref: oneOfType([func, shape({ current: any })]).isRequired,
});

export const userType = shape({
  nickname: string.isRequired,
  name: string.isRequired,
  picture: string.isRequired,
  updated_at: string.isRequired,
  email: string.isRequired,
  email_verified: bool.isRequired,
  sub: string.isRequired,
});

export const authType = shape({
  user: userType.isRequired,
  error: string,
  isAuthenticated: bool.isRequired,
  isLoading: bool.isRequired,
  login: func.isRequired,
  logout: func.isRequired,
});

export const registryType = {
  title: string.isRequired,
  description: string.isRequired,
  p1FullName: string.isRequired,
  p2FullName: string.isRequired,
  email: string.isRequired,
  customUrl: string.isRequired,
  items: [string],
  coverImage: string.isRequired,
  userId: string.isRequired,
  tyMessage: string,
  weddingDate: date,
  phoneNumber: number,
};

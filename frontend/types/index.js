import PropTypes from "prop-types";

const {
  string,
  number,
  bool,
  func,
  oneOfType,
  any,
  shape,
  instanceOf,
  arrayOf,
  Date,
} = PropTypes;

export const itemType = {
  name: string.isRequired,
  description: string.isRequired,
  price: number.isRequired,
  link: string,
  image: string,
  isReserved: bool.isRequired,
  addedOn: string,
  reservedOn: string,
  purchasers: arrayOf(
    shape({
      name: string,
      email: string,
      message: string,
      purchasedOn: string,
      pricePaid: number.isRequired,
    })
  ),
};

export const userType = shape({
  nickname: string.isRequired,
  name: string.isRequired,
  picture: string.isRequired,
  updated_at: string.isRequired,
  email: string.isRequired,
  email_verified: bool.isRequired,
  sub: string.isRequired,
});

export const publicRegistryType = {
  title: string.isRequired,
  description: string.isRequired,
  tyMessage: string,
  p1FullName: string.isRequired,
  p2FullName: string.isRequired,
  weddingDate: instanceOf(Date),
  customUrl: string.isRequired,
  items: arrayOf(shape(itemType)),
  coverImage: string,
};

export const adminRegistryType = {
  ...publicRegistryType,
  phoneNumber: number,
  email: string,
  userId: string.isRequired,
};

export const formErrorType = shape({
  type: string.isRequired,
  message: string,
  ref: oneOfType([func, shape({ current: any })]).isRequired,
});

export const authType = shape({
  user: userType.isRequired,
  error: string,
  isAuthenticated: bool.isRequired,
  isLoading: bool.isRequired,
  login: func.isRequired,
  logout: func.isRequired,
});

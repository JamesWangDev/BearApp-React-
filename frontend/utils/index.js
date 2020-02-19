/* eslint-disable no-undef */
export const getBackendAPI = route =>
  process.env.NODE_ENV === "production"
    ? `https://v16-bears-04-wedding-registry.herokuapp.com/api/${route}`
    : `http://localhost:5000/api/${route}`;

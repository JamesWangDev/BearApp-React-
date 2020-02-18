/* eslint-disable no-undef */
export const getBackendAPI = () =>
  process.env.NODE_ENV === "production"
    ? "https://v16-bears-04-wedding-registry.herokuapp.com/api"
    : "http://localhost:5000/api";

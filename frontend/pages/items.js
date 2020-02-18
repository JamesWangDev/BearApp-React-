import React from "react";
import PropTypes from "prop-types";
import { itemType } from "../types";
import Items from "../components/items";
import fetch from "isomorphic-fetch";
import { getBackendAPI } from "../utils";

const ItemsPage = ({ items }) => {
  if (items.message) {
    return <div>{items.message}</div>;
  }
  return <Items items={items} />;
};

ItemsPage.getInitialProps = async () => {
  const backendAPI = getBackendAPI();
  console.log("backend api: ", backendAPI);
  const res = await fetch(`${backendAPI}/items`);
  const items = await res.json();
  console.log("items: ", items);
  return { items };
};

ItemsPage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(itemType)),
};

export default ItemsPage;
export { itemType };

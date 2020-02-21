import React from "react";
import PropTypes from "prop-types";
import fetch from "isomorphic-fetch";
import { itemType } from "../types";
import Items from "../components/items";
import EditItem from "../components/editItem";
import { getBackendAPI } from "../utils";

const ItemsPage = ({ items }) => {
  if (items.message) {
    return <div>{items.message}</div>;
  }
  return (
    <>
      <EditItem />
      <Items items={items} />
    </>
  );
};

ItemsPage.getInitialProps = async () => {
  const res = await fetch(getBackendAPI("items"));
  const items = await res.json();
  return { items };
};

ItemsPage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(itemType)),
};

export default ItemsPage;
export { itemType };

import React from "react";
import PropTypes from "prop-types";
import { itemType } from "../types";
import Items from "../components/Items";
import EditItem from "../components/EditItem";
import { fetchIt } from "../utils";

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
  const items = await fetchIt("/items");
  return { items };
};

ItemsPage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(itemType)),
};

export default ItemsPage;
export { itemType };

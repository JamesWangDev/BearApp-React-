import React from "react";
import PropTypes from "prop-types";
import { itemType } from "../types";
import Items from "../components/items";
import fetch from "isomorphic-fetch";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const ItemsPage = ({ items }) => <Items items={items} />;

ItemsPage.getInitialProps = async () => {
  const isDev = publicRuntimeConfig.nodeEnv != "production";
  const res = isDev
    ? await fetch(`${publicRuntimeConfig.devBackendUrl}/items`)
    : await fetch(`${publicRuntimeConfig.prodBackendUrl}/items`);
  const items = await res.json();
  return { items };
};

ItemsPage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(itemType)),
};

export default ItemsPage;
export { itemType };

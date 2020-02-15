import React from "react";
import PropTypes from "prop-types";
import Items from "../components/items";

const fetchItems = () =>
  new Promise(resolve =>
    setTimeout(
      () =>
        resolve([
          {
            name: "Fridge",
            description: "A new fridge for our food",
            price: "4000",
            link: "https://fridge.com",
            image: "",
            isPurchased: false,
            isReserved: false,
            addedOn: Date.now(),
            reservedOn: undefined,
            purchasedOn: undefined,
          },
          {
            name: "Desk",
            description: "A new desk to work on in the study",
            price: "300",
            link: "https://desk.com",
            image: "",
            isPurchased: false,
            isReserved: false,
            addedOn: Date.now(),
            reservedOn: undefined,
            purchasedOn: undefined,
          },
        ]),
      200
    )
  );

export const itemType = PropTypes.shape({
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.string,
  isPurchased: PropTypes.bool,
  isReserved: PropTypes.bool,
  addedOn: PropTypes.string,
  reservedOn: PropTypes.string,
  purchasedOn: PropTypes.string,
});
const ItemsPage = ({ items }) => <Items items={items} />;

ItemsPage.getInitialProps = async () => {
  const items = await fetchItems();
  return { items };
};

ItemsPage.propTypes = {
  items: PropTypes.arrayOf(itemType),
};

export default ItemsPage;

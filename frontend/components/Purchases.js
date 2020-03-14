import React from "react";
import PropTypes from "prop-types";
import { itemType } from "../types";
import colors from "../css/colors";
import { getTotalPricePaid } from "../utils";

export default function Purchases({ items }) {
  return (
    <div className="flex flex-wrap justify-center">
      {items.map(({ name, description, image, price, purchasers }) => {
        // cumulative price paid for this item
        const totalPricePaid = getTotalPricePaid(purchasers);

        return (
          <div
            key={name}
            className="w-full max-w-lg mb-4 sm:m-4 bg-white shadow-md rounded-lg"
          >
            <div className="flex flex-col-reverse sm:flex-row text-center sm:text-left justify-between items-center p-5">
              <div className="sm:w-3/5">
                <h3 className="text-3xl">{name}</h3>
                <p className="">{description}</p>
                <div className="flex flex-col items-center mt-3">
                  <p className="font-semibold underline text-lg">
                    Purchase Status ($)
                  </p>
                  <p className="font-normal">
                    {totalPricePaid}
                    <span className="mx-1">/</span>
                    {price}
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-2/5 max-w-xs">
                <img
                  className="w-auto h-24 max-w-xs mx-auto"
                  src={image}
                  alt={name.slice(0, 9)}
                />
              </div>
            </div>

            <ul className="purchasers shadow-sm rounded-lg p-4 pb-1 mx-2 mb-2">
              {purchasers.map((purchaser, i) => (
                <li
                  key={purchaser.email + i}
                  className="bg-white shadow-sm rounded-lg p-3 mb-3"
                >
                  <UserInfo
                    title="Price Paid"
                    text={`${purchaser.pricePaid}`}
                  />
                  <UserInfo
                    title="Purchase Date"
                    text={new Date(purchaser.purchasedOn).toLocaleDateString()}
                  />
                  <UserInfo title="Name" text={`${purchaser.name}`} />
                  <UserInfo title="Email" text={`${purchaser.email}`} />
                  <UserInfo title="Message" text={`${purchaser.message}`} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <style jsx>{`
        .purchasers {
          background-color: ${colors.backgroundSecondary};
        }
      `}</style>
    </div>
  );
}
const UserInfo = ({ title, text }) => (
  <p className="">
    <span className="font-semibold">{`${title}: `}</span>
    <span className={text || "italic"}>
      {text || `Sorry, no ${title.toLowerCase()} provided`}
    </span>
  </p>
);

UserInfo.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
};

Purchases.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(itemType)),
};

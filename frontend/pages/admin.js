import React from "react";
import PropTypes from "prop-types";
import AdminPage from "../components/AdminPage";
import AdminItemsTable from "../components/AdminItemsTable";

import { fetchIt } from "../utils";

const Admin = ({ items }) => {
  return (
    <AdminPage>
      <div className="main-header">
        <div className="main-header__heading">Hello User</div>
        <div className="main-header__updates">Recent Items</div>
      </div>
      {/* <div className="main-overview">
          <div className="main-overview__card">
            <div className="main-overview__card__icon">Overview</div>
            <div className="main-overview__card__info">Card</div>
          </div>
          <div className="main-overview__card">
            <div className="main-overview__card__icon">Overview</div>
            <div className="main-overview__card__info">Card</div>
          </div>
          <div className="main-overview__card">
            <div className="main-overview__card__icon">Overview</div>
            <div className="main-overview__card__info">Card</div>
          </div>
          <div className="main-overview__card">
            <div className="main-overview__card__icon">Overview</div>
            <div className="main-overview__card__info">Card</div>
          </div>
        </div> */}
      {/* <div className="main-cards">
          <div className="main-cards__card">Card One</div>
          <div className="main-cards__card">Card Two</div>
          <div className="main-cards__card">Card Three</div>
        </div> */}
      <div className="flex items-center px-5">
        <AdminItemsTable items={items} />
      </div>
      <style jsx>{`
        .main-header {
          display: flex;
          justify-content: space-between;
          margin: 20px;
          padding: 20px;
          height: 150px; /* Force the height since we don't have actual content yet */
          background-color: #e3e4e6;
          color: slategray;
        }

        .main-overview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(265px, 1fr));
          grid-auto-rows: 94px;
          grid-gap: 20px;
          margin: 20px;
        }

        .main-overview__card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          background-color: #d3d3;
        }

        .main-cards {
          column-count: 1;
          column-gap: 20px;
          margin: 20px;
        }

        .main-cards__card {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          background-color: #82bef6;
          margin-bottom: 20px;
          -webkit-column-break-inside: avoid;
          box-sizing: border-box;
        }

        .main-cards__card:first-child {
          height: 200px;
        }

        .main-cards__card:nth-child(2) {
          height: 485px;
        }

        .main-cards__card:nth-child(3) {
          height: 265px;
        }

        /* Medium-sized screen breakpoint (tablet, 1050px) */
        @media only screen and (min-width: 65.625em) {
          /* Break out main cards into two columns */
          .main-cards {
            column-count: 2;
          }
        }
      `}</style>
    </AdminPage>
  );
};

Admin.getInitialProps = async () => {
  const items = await fetchIt("/items");
  return { items };
};

Admin.propTypes = {
  items: PropTypes.any,
};

export default Admin;

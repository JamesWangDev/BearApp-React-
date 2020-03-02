import React, { useState } from "react";

const Admin = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div className="grid-container">
      <div className="menu-icon" onClick={() => setIsNavOpen(true)}>
        Icon
      </div>
      <header>
        <div className="header__search">Search...</div>
        <div className="header__avatar">Your face</div>
      </header>
      <aside className={isNavOpen ? "active" : ""}>
        <div
          className="sidenav__close-icon"
          onClick={() => setIsNavOpen(false)}
        >
          Close
        </div>
        <ul>
          <li>Item One</li>
          <li>Item Two</li>
          <li>Item Three</li>
          <li>Item Four</li>
          <li>Item Five</li>
        </ul>
      </aside>
      <main>
        <div className="main-header">
          <div className="main-header__heading">Hello User</div>
          <div className="main-header__updates">Recent Items</div>
        </div>
        <div className="main-overview">
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
        </div>
        <div className="main-cards">
          <div className="main-cards__card">Card One</div>
          <div className="main-cards__card">Card Two</div>
          <div className="main-cards__card">Card Three</div>
        </div>
      </main>
      <footer>
        <div className="footer__copyright">&copy; 2018 MTH</div>
        <div className="footer__signature">Mode with love by Bears 04</div>
      </footer>
      <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: 1fr; /* Side nav is hidden on mobile */
          grid-template-rows: 50px 1fr 50px;
          grid-template-areas:
            "header"
            "main"
            "footer";
          height: 100vh;
        }

        .menu-icon {
          position: fixed;
          display: flex;
          top: 5px;
          left: 10px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          z-index: 1;
          cursor: pointer;
          padding: 12px;
          background-color: #dadae3;
        }

        /* Give every child element its grid name */
        header {
          grid-area: header;
          background-color: #648ca6;
        }

        header .header__search {
          margin-left: 62px;
        }

        aside {
          grid-area: sidenav;
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 240px;
          position: fixed;
          overflow-y: auto;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16),
            0 0 0 1px rgba(0, 0, 0, 0.08);
          z-index: 2; /* Needs to sit above the menu icon */
          background-color: #394263;
          transform: translateX(-245px);
          transition: all 0.6s ease-in-out;
        }

        aside.active {
          transform: translateX(0);
        }

        aside .sidenav__close-icon {
          position: absolute;
          visibility: visible;
          top: 8px;
          right: 12px;
          cursor: pointer;
          font-size: 20px;
          color: #ddd;
        }

        aside ul {
          padding: 0;
          margin-top: 85px;
          list-style-type: none;
        }

        aside li {
          padding: 20px 20px 20px 40px;
          color: #ddd;
        }

        aside li:hover {
          background-color: rgba(255, 255, 2555, 0.2);
          cursor: pointer;
        }

        main {
          grid-area: main;
          background-color: #8fd4d9;
        }

        main .main-header {
          display: flex;
          justify-content: space-between;
          margin: 20px;
          padding: 20px;
          height: 150px; /* Force the height since we don't have actual content yet */
          background-color: #e3e4e6;
          color: slategray;
        }

        main .main-overview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(265px, 1fr));
          grid-auto-rows: 94px;
          grid-gap: 20px;
          margin: 20px;
        }

        main .main-overview__card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          background-color: #d3d3;
        }

        main .main-cards {
          column-count: 1;
          column-gap: 20px;
          margin: 20px;
        }

        main .main-cards__card {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          background-color: #82bef6;
          margin-bottom: 20px;
          -webkit-column-break-inside: avoid;
          box-sizing: border-box;
        }

        main .main-cards__card:first-child {
          height: 200px;
        }

        main .main-cards__card:nth-child(2) {
          height: 485px;
        }

        main .main-cards__card:nth-child(3) {
          height: 265px;
        }

        footer {
          grid-area: footer;
          background-color: #648ca6;
        }

        header,
        footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          background-color: #648ca6;
        }

        /* Non-mobile styles, 750px breakpoint */
        @media only screen and (min-width: 46.875em) {
          /* Show the sidenav */
          .grid-container {
            grid-template-columns: 240px 1fr; /* Show the side nav for non-mobile screens */
            grid-template-areas:
              "sidenav header"
              "sidenav main"
              "sidenav footer";
          }

          header .header__search {
            margin-left: 0;
          }

          aside {
            position: relative; /* Fixed position on mobile */
            transform: translateX(0);
          }

          aside .sidenav__close-icon {
            visibility: hidden;
          }
        }

        /* Medium-sized screen breakpoint (tablet, 1050px) */
        @media only screen and (min-width: 65.625em) {
          /* Break out main cards into two columns */
          main .main-cards {
            column-count: 2;
          }
        }
      `}</style>
    </div>
  );
};

export default Admin;

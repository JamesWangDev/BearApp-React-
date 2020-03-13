/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import Items from "../components/Items";
import { fetchIt } from "../utils";
import { registryType } from "../types";

import Footer from "../components/Footer";
/*
This is the main React component, the HTML that gets returned from this function is what
will show on the browser.

The "registry" variable is what we call a "prop" in react, and is being passed into the component
like a parameter to a function
*/
function RegistryPage({ registry }) {
  /* any javascript you want to do you can do here before the return statement */
  return (
    <>
      <main>
        <section className="cover">
          <h1>{registry.title}</h1>
          <h2>{registry.description}</h2>
        </section>
        <section className="items">
          <Items items={registry.items} />
        </section>
      </main>
      <Footer />
      <style jsx>{`
        .page {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        header,
        footer {
          height: 70px;
          width: 100%;
          background-color: gray;
        }
        main {
          min-height: calc(100vh - 70px - 70px);
        }
        main section.cover {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-size: cover;
          text-align: center;
          position: relative;
          overflow: hidden;
          background-repeat: no-repeat;
          background-position: top;
          background-image: url("${registry.coverImage}");
          height: 100vh;
          color: #fff;
        }
        h1 {
          font-size: 4rem;
        }
        h2 {
          font-size: 2rem;
        }
        .items {
          padding: 100px 20px;
        }
      `}</style>
    </>
  );
}

// This is a function specific to next.js (the react framework we're using), and basically says:
// before we render this component in the browser, run this function first, and then return any values
// as "props" into the React component.
// We're using this function to fetch the registry from the server, and then return the registry as
// a "prop" into the React component.
RegistryPage.getInitialProps = async ctx => {
  const registry = await fetchIt(`/registry/${ctx.query.registryUrl}`);
  return { registry };
};

// This is how React does types. It's not required, but it tells React what props to expect,
// and what types they are, and if they're required or not. It's just good practice.
// React will also show a warning if the props don't match the prop types.
// So for example, if Registry page was to recieve a string instead of the registryType,
// things would obviously break because we're expecting the registryType, not a string.
// This can help us catch those errors early.
RegistryPage.propTypes = {
  registry: PropTypes.shape(registryType),
};

export default RegistryPage;

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
  console.log(registry);
  return (
    <>
      <div className="page">
        <header>
          {" "}
          <div className="flex mb-4">
            <div className="w-1/2  h-12 navBarLogo">v16 Bears 04</div>
            <div className="w-1/2  h-12 .text-left .text-xs .text-right">
              {" "}
              <a href="" className="navBarTitle .uppercase. justify-between">
                {registry.p1FullName} & {registry.p2FullName}
              </a>
            </div>
          </div>
        </header>
      </div>

      <main>
        <section>
          <img src={registry.coverImage} />
        </section>

        <section>
          <Items items={registry.items} />
        </section>
      </main>

      <footer>
        <Footer />
      </footer>

      <div className="flex mb-4">
        <div className="w-full h-12">
          <div className="title"></div>
        </div>
      </div>
    </>
  );
}

{
  /* // Anything inside curly brackets { } is how we insert variables into react HTML. Like above. */
}
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
`}</style>;

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

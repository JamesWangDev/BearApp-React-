import React from "react";
import { fetchIt } from "../utils";
import PropTypes from "prop-types";
import { registryType } from "../types";
import Items from "../components/Items";
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
      {
        /* // Any code that you put inside the return is just HTML.
      // The only requrements with React is that everything needs to be nested under a parent component.
      //    i.e.
      //        <div>
      //          // all your html
      //        </div>

      // You can't do something like
      //      return (
      //        <div>Hello</div>
      //        <div>World</div>
      //      )
      // Notice how there are two divs side-by-side, you can't do that, you need to surround both of
      // them with another div, or React's special <> tag. (google React fragment if you want to know more.) */

        <>
          {/* nav bar */}

          <div className="flex mb-4">
            <div className="w-1/2  h-12 navBarLogo">v16 Bears 04</div>
            <div className="w-1/2  h-12 .text-left .text-xs .text-right">
              {" "}
              <a href="" className="navBarTitle .uppercase. justify-between">
                {registry.p1FullName} & {registry.p2FullName}
              </a>
            </div>
          </div>

          {/* title and cover image */}

          <div className="flex mb-4">
            <div className="w-full h-12">
              <div className="title">
                <img src={registry.coverImage} />
              </div>
            </div>
          </div>

          {/* registry items */}

          <div className="flex mb-4 flex-wrap">
            <div className="w-full h-12">
              <Items items={registry.items} />
            </div>
          </div>

          {/* Contact details */}

          <div> </div>
        </>
      }

      {/* // Anything inside curly brackets { } is how we insert variables into react HTML. Like above. */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap");

        .navBarTitle, .navBarLogo {
          font-family: "Josefin Sans", sans-serif;
          q
        }

        .navBarTitle {
          text-align: right;
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

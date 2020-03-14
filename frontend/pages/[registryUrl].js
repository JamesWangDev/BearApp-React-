import React from "react";
import PropTypes from "prop-types";
import ErrorPage from "next/error";
import useSWR from "swr";
import Items from "../components/Items";
import { fetchIt } from "../utils";
import Footer from "../components/Footer";
import { publicRegistryType } from "../types";
import colors from "../css/colors";

/*
This is the main React component, the HTML that gets returned from this function is what
will show on the browser.

The "registryUrl" variable is what we call a "prop" in react, and is being passed into the component
like a parameter to a function
*/
export default function RegistryPage({ registryUrl, initialData, error }) {
  // this is the key we'll need to mutate when a purchase is made
  const swrKey = `/registry/${registryUrl}`;
  // pass in the server rendered registry instead of making...
  // ... an unnecessary client side call
  const { data } = useSWR(swrKey, undefined, { initialData });

  if (error) return <ErrorPage statusCode="404" title="Registry Not Found" />;

  return (
    <>
      <main>
        <section className="cover">
          <div className="cover-text">
            <h1 className="text-6xl mb-4">{data.title}</h1>
            <h2 className="text-3xl">{data.description}</h2>
          </div>
        </section>
        <section className="items bg-gray-200">
          <Items items={data.items} swrKey={swrKey} />
        </section>
      </main>

      <Footer />

      <style jsx>{`
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
          background-image: url("${data.coverImage ||
            "https://i.pinimg.com/originals/6f/10/f1/6f10f12395044476a16c9e53e19902da.jpg"}");
          height: 100vh;
          color: #fff;
        }
        .items {
          padding: 40px 20px;
          background-color: ${colors.backgroundSecondary}
        }
        .cover-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width:100%;
          min-width: 310px;
          max-width: 800px;
          border-radius: 20px;
          padding:10px;
          text-shadow: 2px 2px 3px rgba(0,0,0,0.7), 2px 2px 7px rgba(0,0,0,0.4), 2px 2px 10px rgba(0,0,0,0.1), -1px -1px 2px rgba(0,0,0,0.1);
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
  const { registryUrl } = ctx.query;
  try {
    const initialData = await fetchIt(`/registry/${registryUrl}`);
    console.log(initialData);
    return { registryUrl, initialData };
  } catch (error) {
    return { registryUrl, error };
  }
};

// This is how React does types. It's not required, but it tells React what props to expect,
// and what types they are, and if they're required or not. It's just good practice.
// React will also show a warning if the props don't match the prop types.
// So for example, if Registry page was to recieve a string instead of the registryType,
// things would obviously break because we're expecting the registryType, not a string.
// This can help us catch those errors early.
RegistryPage.propTypes = {
  error: PropTypes.string,
  initialData: PropTypes.shape(publicRegistryType),
  registryUrl: PropTypes.string.isRequired,
};

import React from "react";
import PropTypes from "prop-types";
import Items from "../components/Items";
import { fetchIt } from "../utils";
import { registryType } from "../types";

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
        <header></header>
        <main>
          <section></section>
          <section>
            <Items items={registry.items} />
          </section>
        </main>
        <footer></footer>
      </div>
      {/* <div>
          <header id="header">
            <div className="inner">
              <a href="index.html" className="logo">
                v16-bears04
              </a>
              <nav id="nav">
                <a href="elements.html">
                  {registry.p1FullName} & {registry.p2FullName}
                </a>
              </nav>
            </div>
          </header>
          <a href="#menu" className="navPanelToggle">
            <span className="fa fa-bars"></span>
          </a>
          <section id="banner">
            {" "}
            <img src={registry.coverImage} alt="" />
            <div className="inner">
              <h1>
                {registry.title}
                <span>
                  <br />
                  {registry.description}
                </span>
              </h1>
            </div>
          </section>
          <section id="one">
            <div className="inner">
              <header>
                <h2>Add items</h2>
              </header>

              <ul className="actions">
                <li>
                  <a href="#" className="button alt">
                    Learn More
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <section id="footer">
            <div className="inner">
              <header>
                <h2>Write a message</h2>
              </header>
              <form method="post" action="#">
                <div className="field half first">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" />
                </div>
                <div className="field half">
                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" id="email" />
                </div>
                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea name="message" id="message" rows="6"></textarea>
                </div>
                <ul className="actions">
                  <li>
                    <input type="submit" value="Send Message" className="alt" />
                  </li>
                </ul>
              </form>
              <div className="copyright">
                &copy; Untitled Design:{" "}
                <a href="https://templated.co/">TEMPLATED</a>. Images{" "}
                <a href="https://unsplash.com/">Unsplash</a>
              </div>
            </div>
          </section>
        </div> */}
      {/* // Anything inside curly brackets { } is how we insert variables into react HTML. Like above. */}
      <style jsx>{`
        .page {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        header {
          height: 70px;
          width: 100%;
        }
        main {
        }
        footer {
          height: 70px;
          width: 100%;
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

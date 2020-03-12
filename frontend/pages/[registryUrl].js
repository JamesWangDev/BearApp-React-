import React from "react";
import { fetchIt } from "../utils";
import PropTypes from "prop-types";
import { registryType } from "../types";

import "../css/main.css";
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

        //header
        <div>
          <header id="header">
            <div className="inner">
              <a href="index.html" className="logo">
                introspect
              </a>
              <nav id="nav">
                <a href="index.html">Home</a>
                <a href="generic.html">Generic</a>
                <a href="elements.html">Elements</a>
              </nav>
            </div>
          </header>
          <a href="#menu" className="navPanelToggle">
            <span className="fa fa-bars"></span>
          </a>
          //banner
          <section id="banner">
            <div className="inner">
              <h1>
                Introspect:{" "}
                <span>
                  A free + fully responsive
                  <br />
                  site template by TEMPLATED
                </span>
              </h1>
              <ul className="actions">
                <li>
                  <a href="#" className="button alt">
                    Get Started
                  </a>
                </li>
              </ul>
            </div>
          </section>
          //one
          <section id="one">
            <div className="inner">
              <header>
                <h2>Magna Etiam Lorem</h2>
              </header>
              <p>
                Suspendisse mauris. Fusce accumsan mollis eros. Pellentesque a
                diam sit amet mi ullamcorper vehicula. Integer adipiscin sem.
                Nullam quis massa sit amet nibh viverra malesuada. Nunc sem
                lacus, accumsan quis, faucibus non, congue vel, arcu, erisque
                hendrerit tellus. Integer sagittis. Vivamus a mauris eget arcu
                gravida tristique. Nunc iaculis mi in ante.
              </p>
              <ul className="actions">
                <li>
                  <a href="#" className="button alt">
                    Learn More
                  </a>
                </li>
              </ul>
            </div>
          </section>
          //two
          <section id="two">
            <div className="inner">
              <article>
                <div className="content">
                  <header>
                    <h3>Pellentesque adipis</h3>
                  </header>
                  <div className="image fit">
                    <img src="images/pic01.jpg" alt="" />
                  </div>
                  <p>
                    Cumsan mollis eros. Pellentesque a diam sit amet mi magna
                    ullamcorper vehicula. Integer adipiscin sem. Nullam quis
                    massa sit amet lorem ipsum feugiat tempus.
                  </p>
                </div>
              </article>
              <article className="alt">
                <div className="content">
                  <header>
                    <h3>Morbi interdum mol</h3>
                  </header>
                  <div className="image fit">
                    <img src="images/pic02.jpg" alt="" />
                  </div>
                  <p>
                    Cumsan mollis eros. Pellentesque a diam sit amet mi magna
                    ullamcorper vehicula. Integer adipiscin sem. Nullam quis
                    massa sit amet lorem ipsum feugiat tempus.
                  </p>
                </div>
              </article>
            </div>
          </section>
          //three
          <section id="three">
            <div className="inner">
              <article>
                <div className="content">
                  <span className="icon fa-laptop"></span>
                  <header>
                    <h3>Tempus Feugiat</h3>
                  </header>
                  <p>
                    Morbi interdum mollis sapien. Sed ac risus. Phasellus
                    lacinia, magna lorem ullamcorper laoreet, lectus arcu.
                  </p>
                  <ul className="actions">
                    <li>
                      <a href="" className="button alt">
                        Learn More
                      </a>
                    </li>
                  </ul>
                </div>
              </article>
              <article>
                <div className="content">
                  <span className="icon fa-diamond"></span>
                  <header>
                    <h3>Aliquam Nulla</h3>
                  </header>
                  <p>
                    Ut convallis, sem sit amet interdum consectetuer, odio augue
                    aliquam leo, nec dapibus tortor nibh sed.
                  </p>
                  <ul className="actions">
                    <li>
                      <a href="#" className="button alt">
                        Learn More
                      </a>
                    </li>
                  </ul>
                </div>
              </article>
              <article>
                <div className="content">
                  <span className="icon fa-laptop"></span>
                  <header>
                    <h3>Sed Magna</h3>
                  </header>
                  <p>
                    Suspendisse mauris. Fusce accumsan mollis eros. Pellentesque
                    a diam sit amet mi ullamcorper vehicula.
                  </p>
                  <ul className="actions">
                    <li>
                      <a href="#" className="button alt">
                        Learn More
                      </a>
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </section>
          //footer
          <section id="footer">
            <div className="inner">
              <header>
                <h2>Get in Touch</h2>
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
        </div>
      }
      <div>{registry.title}</div>
      {/* // Anything inside curly brackets { } is how we insert variables into react HTML. Like above. */}
      <style jsx>{``}</style>
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

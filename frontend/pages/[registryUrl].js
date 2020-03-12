import React from "react";
import { fetchIt } from "../utils";
import PropTypes from "prop-types";
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

        <div>
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
        </div>
      }
      <div>{registry.title}</div>
      {/* // Anything inside curly brackets { } is how we insert variables into react HTML. Like above. */}
      <style jsx>{`
        html,
        body,
        div,
        span,
        applet,
        object,
        iframe,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        blockquote,
        pre,
        a,
        abbr,
        acronym,
        address,
        big,
        cite,
        code,
        del,
        dfn,
        em,
        img,
        ins,
        kbd,
        q,
        s,
        samp,
        small,
        strike,
        strong,
        sub,
        sup,
        tt,
        var,
        b,
        u,
        i,
        center,
        dl,
        dt,
        dd,
        ol,
        ul,
        li,
        fieldset,
        form,
        label,
        legend,
        table,
        caption,
        tbody,
        tfoot,
        thead,
        tr,
        th,
        td,
        article,
        aside,
        canvas,
        details,
        embed,
        figure,
        figcaption,
        footer,
        header,
        hgroup,
        menu,
        nav,
        output,
        ruby,
        section,
        summary,
        time,
        mark,
        audio,
        video {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }

        body {
          background-color: #fff;
          color: #111111;
        }

        body,
        input,
        select,
        textarea {
          font-family: "Lato", sans-serif;
          font-size: 15pt;
          font-weight: 300;
          line-height: 2;
        }

        @media screen and (max-width: 1680px) {
          body,
          input,
          select,
          textarea {
            font-size: 13pt;
          }
        }

        @media screen and (max-width: 1280px) {
          body,
          input,
          select,
          textarea {
            font-size: 13pt;
          }
        }

        @media screen and (max-width: 980px) {
          body,
          input,
          select,
          textarea {
            font-size: 12pt;
          }
        }

        @media screen and (max-width: 736px) {
          body,
          input,
          select,
          textarea {
            font-size: 12pt;
          }
        }

        @media screen and (max-width: 480px) {
          body,
          input,
          select,
          textarea {
            font-size: 12pt;
          }
        }

        a {
          -moz-transition: color 0.2s ease-in-out;
          -webkit-transition: color 0.2s ease-in-out;
          -ms-transition: color 0.2s ease-in-out;
          transition: color 0.2s ease-in-out;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        strong,
        b {
          font-weight: 700;
        }

        em,
        i {
          font-style: italic;
        }

        p {
          margin: 0 0 2em 0;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-weight: 700;
          line-height: 1.5;
          margin: 0 0 1em 0;
          text-transform: uppercase;
        }

        h1 a,
        h2 a,
        h3 a,
        h4 a,
        h5 a,
        h6 a {
          color: inherit;
          text-decoration: none;
        }

        h1 {
          font-size: 2em;
          margin: 0 0 0.25em 0;
        }

        h2 {
          font-size: 1.75em;
        }

        h3 {
          font-size: 1.35em;
        }

        h4 {
          font-size: 1.1em;
        }

        h5 {
          font-size: 0.9em;
        }

        h6 {
          font-size: 0.7em;
        }

        @media screen and (max-width: 736px) {
          h1 {
            font-size: 1.5em;
          }

          h2 {
            font-size: 1.25em;
          }

          h3 {
            font-size: 1.1em;
          }
        }

        sub {
          font-size: 0.8em;
          position: relative;
          top: 0.5em;
        }

        sup {
          font-size: 0.8em;
          position: relative;
          top: -0.5em;
        }

        blockquote {
          border-left: solid 4px;
          font-style: italic;
          margin: 0 0 2em 0;
          padding: 0.5em 0 0.5em 2em;
        }

        code {
          border-radius: 0;
          border: solid 1px;
          font-family: "Courier New", monospace;
          font-size: 0.9em;
          margin: 0 0.25em;
          padding: 0.25em 0.65em;
        }

        pre {
          -webkit-overflow-scrolling: touch;
          font-family: "Courier New", monospace;
          font-size: 0.9em;
          margin: 0 0 2em 0;
        }

        pre code {
          display: block;
          line-height: 1.75;
          padding: 1em 1.5em;
          overflow-x: auto;
        }

        hr {
          border: 0;
          border-bottom: solid 1px;
          margin: 2em 0;
        }

        hr.major {
          margin: 3em 0;
        }

        .align-left {
          text-align: left;
        }

        .align-center {
          text-align: center;
        }

        .align-right {
          text-align: right;
        }

        input,
        select,
        textarea {
          color: #e5474b;
        }

        a {
          color: #e5474b;
        }

        strong,
        b {
          color: #e5474b;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          color: #e5474b;
        }

        blockquote {
          border-left-color: #e5474b;
        }

        code {
          background: none;
          border-color: #e5474b;
        }

        hr {
          border-bottom-color: #e5474b;
        }

        body {
          line-height: 1;
        }

        input[type="submit"],
        input[type="reset"],
        input[type="button"],
        button,
        .button {
          -moz-appearance: none;
          -webkit-appearance: none;
          -ms-appearance: none;
          appearance: none;
          -moz-transition: background-color 0.2s ease-in-out,
            color 0.2s ease-in-out;
          -webkit-transition: background-color 0.2s ease-in-out,
            color 0.2s ease-in-out;
          -ms-transition: background-color 0.2s ease-in-out,
            color 0.2s ease-in-out;
          transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
          border-radius: 0;
          border: 0;
          cursor: pointer;
          display: inline-block;
          font-size: 0.8em;
          font-weight: 700;
          height: 3.5em;
          line-height: 3.65em;
          padding: 0 2.25em;
          text-align: center;
          text-decoration: none;
          text-transform: uppercase;
          white-space: nowrap;
        }

        input[type="submit"]:hover,
        input[type="reset"]:hover,
        input[type="button"]:hover,
        button:hover,
        .button:hover {
          text-decoration: none;
        }

        input[type="submit"].icon,
        input[type="reset"].icon,
        input[type="button"].icon,
        button.icon,
        .button.icon {
          padding-left: 1.35em;
        }

        input[type="submit"].icon:before,
        input[type="reset"].icon:before,
        input[type="button"].icon:before,
        button.icon:before,
        .button.icon:before {
          margin-right: 0.5em;
        }

        input[type="submit"].fit,
        input[type="reset"].fit,
        input[type="button"].fit,
        button.fit,
        .button.fit {
          display: block;
          margin: 0 0 1em 0;
          width: 100%;
        }

        input[type="submit"].small,
        input[type="reset"].small,
        input[type="button"].small,
        button.small,
        .button.small {
          font-size: 0.8em;
        }

        input[type="submit"].big,
        input[type="reset"].big,
        input[type="button"].big,
        button.big,
        .button.big {
          font-size: 1.35em;
        }

        input[type="submit"].disabled,
        input[type="submit"]:disabled,
        input[type="reset"].disabled,
        input[type="reset"]:disabled,
        input[type="button"].disabled,
        input[type="button"]:disabled,
        button.disabled,
        button:disabled,
        .button.disabled,
        .button:disabled {
          -moz-pointer-events: none;
          -webkit-pointer-events: none;
          -ms-pointer-events: none;
          pointer-events: none;
          opacity: 0.25;
        }

        input[type="submit"],
        input[type="reset"],
        input[type="button"],
        button,
        .button {
          background-color: #5a5a5a;
          color: #ffffff !important;
        }

        input[type="submit"]:hover,
        input[type="reset"]:hover,
        input[type="button"]:hover,
        button:hover,
        .button:hover {
          background-color: #676767;
        }

        input[type="submit"]:active,
        input[type="reset"]:active,
        input[type="button"]:active,
        button:active,
        .button:active {
          background-color: #4d4d4d;
        }

        input[type="submit"].alt,
        input[type="reset"].alt,
        input[type="button"].alt,
        button.alt,
        .button.alt {
          background-color: transparent;
          box-shadow: inset 0 0 0 2px #e5474b;
          color: #e5474b !important;
        }

        input[type="submit"].alt:hover,
        input[type="reset"].alt:hover,
        input[type="button"].alt:hover,
        button.alt:hover,
        .button.alt:hover {
          background: #fceced;
        }

        input[type="submit"].alt:active,
        input[type="reset"].alt:active,
        input[type="button"].alt:active,
        button.alt:active,
        .button.alt:active {
          background-color: #f9dadb;
        }

        input[type="submit"].alt.icon:before,
        input[type="reset"].alt.icon:before,
        input[type="button"].alt.icon:before,
        button.alt.icon:before,
        .button.alt.icon:before {
          color: #717171;
        }

        input[type="submit"].special,
        input[type="reset"].special,
        input[type="button"].special,
        button.special,
        .button.special {
          background-color: #e5474b;
          color: #ffffff !important;
        }

        input[type="submit"].special:hover,
        input[type="reset"].special:hover,
        input[type="button"].special:hover,
        button.special:hover,
        .button.special:hover {
          background-color: #e85d61;
        }

        input[type="submit"].special:active,
        input[type="reset"].special:active,
        input[type="button"].special:active,
        button.special:active,
        .button.special:active {
          background-color: #e23135;
        }

        .icon {
          text-decoration: none;
          border-bottom: none;
          position: relative;
        }

        .icon:before {
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font-family: FontAwesome;
          font-style: normal;
          font-weight: normal;
          text-transform: none !important;
        }

        .icon > .label {
          display: none;
        }

        .image {
          border-radius: 0;
          border: 0;
          display: inline-block;
          position: relative;
        }

        .image img {
          border-radius: 0;
          display: block;
        }

        .image.left,
        .image.right {
          max-width: 40%;
        }

        .image.left img,
        .image.right img {
          width: 100%;
        }

        .image.left {
          float: left;
          margin: 0 1.5em 1em 0;
          top: 0.25em;
        }

        .image.right {
          float: right;
          margin: 0 0 1em 1.5em;
          top: 0.25em;
        }

        .image.fit {
          display: block;
          margin: 0 0 2em 0;
          width: 100%;
        }

        .image.fit img {
          width: 100%;
        }

        .image.main {
          display: block;
          margin: 0 0 3em 0;
          width: 100%;
        }

        .image.main img {
          width: 100%;
        }

        ol {
          list-style: decimal;
          margin: 0 0 2em 0;
          padding-left: 1.25em;
        }

        ol li {
          padding-left: 0.25em;
        }

        ul {
          list-style: disc;
          margin: 0 0 2em 0;
          padding-left: 1em;
        }

        ul li {
          padding-left: 0.5em;
        }

        ul.alt {
          list-style: none;
          padding-left: 0;
        }

        ul.alt li {
          border-top: solid 1px;
          padding: 0.5em 0;
        }

        ul.alt li:first-child {
          border-top: 0;
          padding-top: 0;
        }

        ul.icons {
          cursor: default;
          list-style: none;
          padding-left: 0;
        }

        ul.icons li {
          display: inline-block;
          padding: 0 1em 0 0;
        }

        ul.icons li:last-child {
          padding-right: 0;
        }

        ul.icons li .icon:before {
          font-size: 2em;
        }

        ul.actions {
          cursor: default;
          list-style: none;
          padding-left: 0;
        }

        ul.actions li {
          display: inline-block;
          padding: 0 1em 0 0;
          vertical-align: middle;
        }

        ul.actions li:last-child {
          padding-right: 0;
        }

        ul.actions.small li {
          padding: 0 0.5em 0 0;
        }

        ul.actions.vertical li {
          display: block;
          padding: 1em 0 0 0;
        }

        ul.actions.vertical li:first-child {
          padding-top: 0;
        }

        ul.actions.vertical li > * {
          margin-bottom: 0;
        }

        ul.actions.vertical.small li {
          padding: 0.5em 0 0 0;
        }

        ul.actions.vertical.small li:first-child {
          padding-top: 0;
        }

        ul.actions.fit {
          display: table;
          margin-left: -1em;
          padding: 0;
          table-layout: fixed;
          width: calc(100% + 1em);
        }

        ul.actions.fit li {
          display: table-cell;
          padding: 0 0 0 1em;
        }

        ul.actions.fit li > * {
          margin-bottom: 0;
        }

        ul.actions.fit.small {
          margin-left: -0.5em;
          width: calc(100% + 0.5em);
        }

        ul.actions.fit.small li {
          padding: 0 0 0 0.5em;
        }

        dl {
          margin: 0 0 2em 0;
        }

        dl dt {
          display: block;
          font-weight: 700;
          margin: 0 0 1em 0;
        }

        dl dd {
          margin-left: 2em;
        }

        ul.alt li {
          border-top-color: #e5474b;
        }

        section.special,
        article.special {
          text-align: center;
        }

        section .inner {
          max-width: 65em;
          width: calc(100% - 6em);
          margin: 0 auto;
        }

        @media screen and (max-width: 480px) {
          section .inner {
            max-width: 90%;
            width: 90%;
          }
        }

        header p {
          position: relative;
          margin: 0 0 1.5em 0;
        }

        header h2 + p {
          font-size: 1.25em;
          margin-top: -1em;
        }

        header h3 + p {
          font-size: 1.1em;
          margin-top: -0.8em;
        }

        header h4 + p,
        header h5 + p,
        header h6 + p {
          font-size: 0.9em;
          margin-top: -0.6em;
        }

        header p {
          color: #717171;
        }
        body {
          position: relative;
          padding-top: 5em;
        }

        #header {
          background: #1c1c1c;
          color: #d5d5d5;
          cursor: default;
          height: 5em;
          left: 0;
          line-height: 5em;
          position: fixed;
          text-align: right;
          top: 0;
          width: 100%;
          z-index: 10001;
        }

        #header .inner {
          max-width: 65em;
          width: calc(100% - 6em);
          margin: 0 auto;
          position: relative;
        }

        @media screen and (max-width: 480px) {
          #header .inner {
            max-width: 90%;
            width: 90%;
          }
        }

        #header .logo {
          font-family: "Pacifico", cursive;
          display: inline-block;
          height: inherit;
          left: 0;
          line-height: inherit;
          margin: 0;
          padding: 0;
          position: absolute;
          top: 0;
          color: #e5474b;
          font-size: 1.75em;
          text-transform: none;
          font-weight: normal;
          padding: 0;
        }

        #header .logo:hover {
          color: rgba(229, 71, 75, 0.75);
        }

        #header a {
          -moz-transition: color 0.2s ease-in-out;
          -webkit-transition: color 0.2s ease-in-out;
          -ms-transition: color 0.2s ease-in-out;
          transition: color 0.2s ease-in-out;
          display: inline-block;
          padding: 0 2em;
          color: #ffffff;
          text-decoration: none;
          text-transform: uppercase;
          font-weight: 700;
          font-size: 0.85em;
        }

        #header a:hover {
          color: rgba(255, 255, 255, 0.75);
        }

        #header a:last-child {
          padding-right: 0em;
        }

        @media screen and (max-width: 736px) {
          #header a {
            padding: 0 0.5em;
          }
        }

        @media screen and (max-width: 480px) {
          #header {
            min-width: 320px;
          }
        }
        #nav {
          display: inline-block;
        }

        @media screen and (max-width: 980px) {
          #nav {
            display: none;
          }
        }

        .navPanelToggle {
          position: fixed;
          text-decoration: none;
          height: 4em;
          right: 3em;
          top: 0.75em;
          width: 4em;
          display: none;
          z-index: 10002;
        }

        .navPanelToggle:before {
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font-family: FontAwesome;
          font-style: normal;
          font-weight: normal;
          text-transform: none !important;
          color: #fff;
          display: block;
          font-size: 16px;
          height: 2.25em;
          left: 0.5em;
          line-height: 2.25em;
          position: absolute;
          text-align: center;
          top: 0.5em;
          width: 3.5em;
        }

        @media screen and (max-width: 980px) {
          .navPanelToggle {
            display: block;
          }
        }

        @media screen and (max-width: 736px) {
          .navPanelToggle {
            right: 1em;
          }
        }

        .navPanelToggle *:before {
          color: #fff;
          display: block;
          font-size: 16px;
          height: 2.25em;
          left: 0.5em;
          line-height: 2.25em;
          position: absolute;
          text-align: center;
          top: 0.5em;
          width: 3.5em;
        }

        #navPanel {
          -moz-transform: translatex(20em);
          -webkit-transform: translatex(20em);
          -ms-transform: translatex(20em);
          transform: translatex(20em);
          -moz-transition: -moz-transform 0.2s ease-in-out,
            visibility 0.2s ease-in-out;
          -webkit-transition: -webkit-transform 0.2s ease-in-out,
            visibility 0.2s ease-in-out;
          -ms-transition: -ms-transform 0.2s ease-in-out,
            visibility 0.2s ease-in-out;
          transition: transform 0.2s ease-in-out, visibility 0.2s ease-in-out;
          -webkit-overflow-scrolling: touch;
          visibility: hidden;
          overflow-y: auto;
          position: fixed;
          right: 0;
          top: 0;
          background: #1c1c1c;
          color: #fff;
          height: 100%;
          max-width: 80%;
          width: 20em;
          padding: 1.5em;
          text-transform: uppercase;
          z-index: 10003;
          display: none;
        }

        #navPanel.visible {
          -moz-transform: translatex(0);
          -webkit-transform: translatex(0);
          -ms-transform: translatex(0);
          transform: translatex(0);
          box-shadow: 0 0 1.5em 0 rgba(0, 0, 0, 0.2);
          visibility: visible;
        }

        #navPanel a:not(.close) {
          border-top: solid 1px rgba(255, 255, 255, 0.1);
          color: #fff;
          font-weight: 700;
          display: block;
          padding: 0.75em 0;
          text-decoration: none;
        }

        #navPanel a:not(.close):first-child {
          border: none;
        }

        #navPanel .close {
          text-decoration: none;
          -moz-transition: color 0.2s ease-in-out;
          -webkit-transition: color 0.2s ease-in-out;
          -ms-transition: color 0.2s ease-in-out;
          transition: color 0.2s ease-in-out;
          -webkit-tap-highlight-color: transparent;
          border: 0;
          color: #484848;
          cursor: pointer;
          display: block;
          height: 4em;
          padding-right: 1.25em;
          position: absolute;
          right: 0;
          text-align: right;
          top: 0;
          vertical-align: middle;
          width: 5em;
        }

        #navPanel .close:before {
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font-family: FontAwesome;
          font-style: normal;
          font-weight: normal;
          text-transform: none !important;
          content: "\f00d";
          width: 3em;
          height: 3em;
          line-height: 3em;
          display: block;
          position: absolute;
          right: 0;
          top: 0;
          text-align: center;
        }

        #navPanel .close:hover {
          color: inherit;
        }

        @media screen and (max-width: 980px) {
          #navPanel {
            display: block;
          }
        }

        #banner {
          background-color: #e5474b;
          color: #f2a3a5;
          padding: 13em 0 11em 0;
          background-color: #0c0c0c;
          background-image: url("../../images/banner.jpg");
          background-size: cover;
          background-repeat: no-repeat;
          background-position: 15% left;
          text-align: left;
          position: relative;
          z-index: 9999;
        }

        #banner input,
        #banner select,
        #banner textarea {
          color: #ffffff;
        }

        #banner a {
          color: #ffffff;
        }

        #banner strong,
        #banner b {
          color: #ffffff;
        }

        #banner h1,
        #banner h2,
        #banner h3,
        #banner h4,
        #banner h5,
        #banner h6 {
          color: #fff;
        }

        #banner blockquote {
          border-left-color: #fff;
        }

        #banner code {
          background: none;
          border-color: #fff;
        }

        #banner hr {
          border-bottom-color: #fff;
        }

        #banner input[type="submit"],
        #banner input[type="reset"],
        #banner input[type="button"],
        #banner button,
        #banner .button {
          background-color: #5a5a5a;
          color: #ffffff !important;
        }

        #banner input[type="submit"]:hover,
        #banner input[type="reset"]:hover,
        #banner input[type="button"]:hover,
        #banner button:hover,
        #banner .button:hover {
          background-color: #676767;
        }

        #banner input[type="submit"]:active,
        #banner input[type="reset"]:active,
        #banner input[type="button"]:active,
        #banner button:active,
        #banner .button:active {
          background-color: #4d4d4d;
        }

        #banner input[type="submit"].alt,
        #banner input[type="reset"].alt,
        #banner input[type="button"].alt,
        #banner button.alt,
        #banner .button.alt {
          background-color: transparent;
          box-shadow: inset 0 0 0 2px #fff;
          color: #ffffff !important;
        }

        #banner input[type="submit"].alt:hover,
        #banner input[type="reset"].alt:hover,
        #banner input[type="button"].alt:hover,
        #banner button.alt:hover,
        #banner .button.alt:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        #banner input[type="submit"].alt:active,
        #banner input[type="reset"].alt:active,
        #banner input[type="button"].alt:active,
        #banner button.alt:active,
        #banner .button.alt:active {
          background-color: rgba(255, 255, 255, 0.2);
        }

        #banner input[type="submit"].alt.icon:before,
        #banner input[type="reset"].alt.icon:before,
        #banner input[type="button"].alt.icon:before,
        #banner button.alt.icon:before,
        #banner .button.alt.icon:before {
          color: #f8d1d2;
        }

        #banner input[type="submit"].special,
        #banner input[type="reset"].special,
        #banner input[type="button"].special,
        #banner button.special,
        #banner .button.special {
          background-color: #ffffff;
          color: #e5474b !important;
        }

        #banner:after {
          -moz-transition: opacity 4s ease;
          -webkit-transition: opacity 4s ease;
          -ms-transition: opacity 4s ease;
          transition: opacity 4s ease;
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          display: block;
          top: 0;
          left: 0;
          background-color: #0c0c0c;
          opacity: 0.25;
        }

        #banner .inner {
          max-width: 65em;
          width: calc(100% - 6em);
          margin: 0 auto;
          position: relative;
          z-index: 10000;
          line-height: 1.5;
        }

        @media screen and (max-width: 480px) {
          #banner .inner {
            max-width: 90%;
            width: 90%;
          }
        }

        #banner h1 {
          font-size: 2em;
          margin: 0 0 1em 0;
          padding: 0;
          letter-spacing: 3px;
          font-weight: 700;
        }

        #banner h1 span {
          font-weight: 400;
        }

        body.is-loading #banner:after {
          opacity: 1;
        }

        @media screen and (max-width: 1680px) {
          #banner {
            padding: 10em 0 8em 0;
          }
        }

        @media screen and (max-width: 1280px) {
          #banner {
            padding: 8em 0 6em 0;
          }
        }

        @media screen and (max-width: 980px) {
          #banner {
            padding: 12em 0 10em 0;
          }

          #banner br {
            display: none;
          }
        }

        @media screen and (max-width: 736px) {
          #banner {
            padding: 4em 0 2em 0;
          }

          #banner h1 {
            font-size: 1.75em;
          }
        }

        @media screen and (max-width: 480px) {
          #banner {
            padding: 5em 0 3em 0;
          }

          #banner ul {
            margin-top: 1em;
          }
        }
        #main {
          padding: 4em 0 2em 0;
        }

        #one {
          padding: 6em 0 4em 0;
        }

        @media screen and (max-width: 980px) {
          #one {
            padding: 4em 0 2em 0;
          }
        }

        @media screen and (max-width: 736px) {
          #one {
            padding: 2em 0 0.1em 0;
          }
        }

        #two {
          padding: 6em 0 4em 0;
          background: #f3f3f3;
          background: -moz-linear-gradient(
            left,
            #f3f3f3 0%,
            #f3f3f3 50%,
            #f7f7f7 0%,
            #f7f7f7 100%
          );
          background: -webkit-linear-gradient(
            left,
            #f3f3f3 0%,
            #f3f3f3 50%,
            #f7f7f7 0%,
            #f7f7f7 100%
          );
          background: linear-gradient(
            to right,
            #f3f3f3 0%,
            #f3f3f3 50%,
            #f7f7f7 0%,
            #f7f7f7 100%
          );
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f3f3f3', endColorstr='#f7f7f7',GradientType=1 );
        }

        #two .inner {
          display: -ms-flexbox;
          display: -moz-flex;
          display: -webkit-flex;
          display: -ms-flex;
          display: flex;
          -moz-flex-direction: row;
          -webkit-flex-direction: row;
          -ms-flex-direction: row;
          flex-direction: row;
        }

        #two .inner article {
          width: 50%;
        }

        #two .inner article:first-child {
          padding-right: 6em;
        }

        #two .inner article:last-child {
          padding-left: 6em;
        }

        @media screen and (max-width: 980px) {
          #two {
            padding: 4em 0 2em 0;
            background: -moz-linear-gradient(
              top,
              #f3f3f3 0%,
              #f3f3f3 50%,
              #f7f7f7 0%,
              #f7f7f7 100%
            );
            background: -webkit-linear-gradient(
              top,
              #f3f3f3 0%,
              #f3f3f3 50%,
              #f7f7f7 0%,
              #f7f7f7 100%
            );
            background: linear-gradient(
              to bottom,
              #f3f3f3 0%,
              #f3f3f3 50%,
              #f7f7f7 0%,
              #f7f7f7 100%
            );
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f3f3f3', endColorstr='#f7f7f7',GradientType=0 );
          }

          #two .inner {
            -moz-flex-direction: column;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
          }

          #two .inner article {
            width: 100%;
          }

          #two .inner article:first-child {
            padding-right: 0;
            padding-bottom: 2em;
          }

          #two .inner article:last-child {
            padding-left: 0;
            padding-top: 2em;
          }
        }

        @media screen and (max-width: 736px) {
          #two {
            padding: 2em 0 0.1em 0;
          }
        }

        #three {
          padding: 6em 0 4em 0;
        }

        #three .inner {
          display: -ms-flexbox;
          display: -moz-flex;
          display: -webkit-flex;
          display: -ms-flex;
          display: flex;
          -moz-flex-direction: row;
          -webkit-flex-direction: row;
          -ms-flex-direction: row;
          flex-direction: row;
          -moz-justify-content: space-between;
          -webkit-justify-content: space-between;
          -ms-justify-content: space-between;
          justify-content: space-between;
          -ms-flex-pack: justify;
        }

        #three .inner article {
          width: 26%;
          display: block;
        }

        #three .inner article p {
          color: #717171;
        }

        #three .inner article .icon {
          color: #b3b3b3;
          font-size: 3em;
        }

        @media screen and (max-width: 980px) {
          #three .inner {
            -moz-flex-direction: column;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
          }

          #three .inner article {
            width: 100%;
            margin: 0 auto;
          }
        }

        @media screen and (max-width: 980px) {
          #three {
            padding: 4em 0 2em 0;
          }
        }

        @media screen and (max-width: 736px) {
          #three {
            padding: 2em 0 0.1em 0;
          }
        }

        #footer {
          background-color: #e5474b;
          color: #f2a3a5;
          padding: 4em 0 2em 0;
          background: #e5474b;
        }

        #footer input,
        #footer select,
        #footer textarea {
          color: #ffffff;
        }

        #footer a {
          color: #ffffff;
        }

        #footer strong,
        #footer b {
          color: #ffffff;
        }

        #footer h1,
        #footer h2,
        #footer h3,
        #footer h4,
        #footer h5,
        #footer h6 {
          color: #fff;
        }

        #footer blockquote {
          border-left-color: #fff;
        }

        #footer code {
          background: none;
          border-color: #fff;
        }

        #footer hr {
          border-bottom-color: #fff;
        }

        #footer input[type="submit"],
        #footer input[type="reset"],
        #footer input[type="button"],
        #footer button,
        #footer .button {
          background-color: #5a5a5a;
          color: #ffffff !important;
        }

        #footer input[type="submit"]:hover,
        #footer input[type="reset"]:hover,
        #footer input[type="button"]:hover,
        #footer button:hover,
        #footer .button:hover {
          background-color: #676767;
        }

        #footer input[type="submit"]:active,
        #footer input[type="reset"]:active,
        #footer input[type="button"]:active,
        #footer button:active,
        #footer .button:active {
          background-color: #4d4d4d;
        }

        #footer input[type="submit"].alt,
        #footer input[type="reset"].alt,
        #footer input[type="button"].alt,
        #footer button.alt,
        #footer .button.alt {
          background-color: transparent;
          box-shadow: inset 0 0 0 2px #fff;
          color: #ffffff !important;
        }

        #footer input[type="submit"].alt:hover,
        #footer input[type="reset"].alt:hover,
        #footer input[type="button"].alt:hover,
        #footer button.alt:hover,
        #footer .button.alt:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        #footer input[type="submit"].alt:active,
        #footer input[type="reset"].alt:active,
        #footer input[type="button"].alt:active,
        #footer button.alt:active,
        #footer .button.alt:active {
          background-color: rgba(255, 255, 255, 0.2);
        }

        #footer input[type="submit"].alt.icon:before,
        #footer input[type="reset"].alt.icon:before,
        #footer input[type="button"].alt.icon:before,
        #footer button.alt.icon:before,
        #footer .button.alt.icon:before {
          color: #f8d1d2;
        }

        #footer input[type="submit"].special,
        #footer input[type="reset"].special,
        #footer input[type="button"].special,
        #footer button.special,
        #footer .button.special {
          background-color: #ffffff;
          color: #e5474b !important;
        }

        #footer label {
          color: #ffffff;
        }

        #footer input[type="text"],
        #footer input[type="password"],
        #footer input[type="email"],
        #footer select,
        #footer textarea {
          background: none;
          border-color: rgba(255, 255, 255, 0.25);
        }

        #footer input[type="text"]:focus,
        #footer input[type="password"]:focus,
        #footer input[type="email"]:focus,
        #footer select:focus,
        #footer textarea:focus {
          border-color: #ffffff;
          box-shadow: 0 0 0 1px #ffffff;
        }

        #footer .select-wrapper:before {
          color: #fff;
        }

        #footer input[type="checkbox"] + label,
        #footer input[type="radio"] + label {
          color: #f2a3a5;
        }

        #footer input[type="checkbox"] + label:before,
        #footer input[type="radio"] + label:before {
          background: none;
          border-color: #fff;
        }

        #footer input[type="checkbox"]:checked + label:before,
        #footer input[type="radio"]:checked + label:before {
          background-color: #ffffff;
          border-color: #ffffff;
          color: #e5474b;
        }

        #footer input[type="checkbox"]:focus + label:before,
        #footer input[type="radio"]:focus + label:before {
          border-color: #ffffff;
          box-shadow: 0 0 0 1px #ffffff;
        }

        #footer ::-webkit-input-placeholder {
          color: #f8d1d2 !important;
        }

        #footer :-moz-placeholder {
          color: #f8d1d2 !important;
        }

        #footer ::-moz-placeholder {
          color: #f8d1d2 !important;
        }

        #footer :-ms-input-placeholder {
          color: #f8d1d2 !important;
        }

        #footer .formerize-placeholder {
          color: #f8d1d2 !important;
        }

        #footer .inner {
          max-width: 65em;
          width: calc(100% - 6em);
          margin: 0 auto;
        }

        @media screen and (max-width: 480px) {
          #footer .inner {
            max-width: 90%;
            width: 90%;
          }
        }

        #footer .copyright {
          font-size: 0.9em;
          margin: 0 0 2em 0;
          padding: 0;
        }

        #footer .copyright a {
          color: #f2a3a5;
        }

        @media screen and (max-width: 980px) {
          #footer {
            padding: 4em 0 2em 0;
          }
        }

        @media screen and (max-width: 736px) {
          #footer {
            padding: 2em 0 0.1em 0;
          }
        }

        form {
          margin: 0 0 2em 0;
        }

        form .field {
          margin: 0 0 2em 0;
        }

        form .field.half {
          width: 50%;
          float: left;
          padding: 0 0 0 1em;
        }

        form .field.half.first {
          padding: 0 1em 0 0;
        }

        form > .actions {
          margin: 2.5em 0 0 0 !important;
        }

        @media screen and (max-width: 736px) {
          form .field {
            margin: 0 0 1.5em 0;
          }

          form .field.half {
            padding: 0 0 0 0.75em;
          }

          form .field.half.first {
            padding: 0 0.75em 0 0;
          }

          form > .actions {
            margin: 2em 0 0 0 !important;
          }
        }

        @media screen and (max-width: 480px) {
          form .field.half {
            width: 100%;
            float: none;
            padding: 0;
          }

          form .field.half.first {
            padding: 0;
          }
        }

        label {
          display: block;
          font-size: 0.9em;
          text-transform: uppercase;
          font-weight: 700;
          margin: 0 0 1em 0;
        }

        input[type="text"],
        input[type="password"],
        input[type="email"],
        select,
        textarea {
          -moz-appearance: none;
          -webkit-appearance: none;
          -ms-appearance: none;
          appearance: none;
          border-radius: 0;
          border: none;
          border: solid 3px;
          color: inherit;
          display: block;
          outline: 0;
          padding: 0 1em;
          text-decoration: none;
          width: 100%;
        }

        input[type="text"]:invalid,
        input[type="password"]:invalid,
        input[type="email"]:invalid,
        select:invalid,
        textarea:invalid {
          box-shadow: none;
        }

        .select-wrapper {
          text-decoration: none;
          display: block;
          position: relative;
        }

        .select-wrapper:before {
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font-family: FontAwesome;
          font-style: normal;
          font-weight: normal;
          text-transform: none !important;
        }

        .select-wrapper:before {
          content: "\f078";
          display: block;
          height: 2.75em;
          line-height: 2.75em;
          pointer-events: none;
          position: absolute;
          right: 0;
          text-align: center;
          top: 0;
          width: 2.75em;
        }

        .select-wrapper select::-ms-expand {
          display: none;
        }

        input[type="text"],
        input[type="password"],
        input[type="email"],
        select {
          height: 2.75em;
        }

        textarea {
          padding: 0.75em 1em;
        }

        input[type="checkbox"],
        input[type="radio"] {
          -moz-appearance: none;
          -webkit-appearance: none;
          -ms-appearance: none;
          appearance: none;
          display: block;
          float: left;
          margin-right: -2em;
          opacity: 0;
          width: 1em;
          z-index: -1;
        }

        input[type="checkbox"] + label,
        input[type="radio"] + label {
          text-decoration: none;
          cursor: pointer;
          display: inline-block;
          font-size: 1em;
          font-weight: 300;
          padding-left: 2.4em;
          padding-right: 0.75em;
          position: relative;
        }

        input[type="checkbox"] + label:before,
        input[type="radio"] + label:before {
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font-family: FontAwesome;
          font-style: normal;
          font-weight: normal;
          text-transform: none !important;
        }

        input[type="checkbox"] + label:before,
        input[type="radio"] + label:before {
          border-radius: 0;
          border: solid 1px;
          content: "";
          display: inline-block;
          height: 1.65em;
          left: 0;
          line-height: 1.58125em;
          position: absolute;
          text-align: center;
          top: 0;
          width: 1.65em;
        }

        input[type="checkbox"]:checked + label:before,
        input[type="radio"]:checked + label:before {
          content: "\f00c";
        }

        input[type="checkbox"] + label:before {
          border-radius: 0;
        }

        input[type="radio"] + label:before {
          border-radius: 100%;
        }

        ::-webkit-input-placeholder {
          opacity: 1;
        }

        :-moz-placeholder {
          opacity: 1;
        }

        ::-moz-placeholder {
          opacity: 1;
        }

        :-ms-input-placeholder {
          opacity: 1;
        }

        .formerize-placeholder {
          opacity: 1;
        }

        label {
          color: #e5474b;
        }

        input[type="text"],
        input[type="password"],
        input[type="email"],
        select,
        textarea {
          background: none;
          border-color: #fceced;
        }

        input[type="text"]:focus,
        input[type="password"]:focus,
        input[type="email"]:focus,
        select:focus,
        textarea:focus {
          border-color: #e5474b;
          box-shadow: 0 0 0 1px #e5474b;
        }

        .select-wrapper:before {
          color: #e5474b;
        }

        input[type="checkbox"] + label,
        input[type="radio"] + label {
          color: #111111;
        }

        input[type="checkbox"] + label:before,
        input[type="radio"] + label:before {
          background: none;
          border-color: #e5474b;
        }

        input[type="checkbox"]:checked + label:before,
        input[type="radio"]:checked + label:before {
          background-color: #e5474b;
          border-color: #e5474b;
          color: #ffffff;
        }

        input[type="checkbox"]:focus + label:before,
        input[type="radio"]:focus + label:before {
          border-color: #e5474b;
          box-shadow: 0 0 0 1px #e5474b;
        }

        ::-webkit-input-placeholder {
          color: #717171 !important;
        }

        :-moz-placeholder {
          color: #717171 !important;
        }

        ::-moz-placeholder {
          color: #717171 !important;
        }

        :-ms-input-placeholder {
          color: #717171 !important;
        }

        .formerize-placeholder {
          color: #717171 !important;
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

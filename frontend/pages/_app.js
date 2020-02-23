import React from "react";
import App from "next/app";
import "../css/tailwind.css";
import { Auth0Provider } from "use-auth0-hooks";
import { DOMAIN, CLIENTID, REDIRECTURI } from "../utils";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Auth0Provider
        domain={DOMAIN}
        clientId={CLIENTID}
        redirectUri={REDIRECTURI}
      >
        <Component {...pageProps} />
      </Auth0Provider>
    );
  }
}

export default MyApp;

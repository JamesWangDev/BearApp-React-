import React from "react";
import App from "next/app";
import "../css/tailwind.css";
import { Auth0Provider } from "use-auth0-hooks";
import { DOMAIN, CLIENTID, REDIRECTURI, AUTH0_API_IDENTIFIER } from "../utils";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Auth0Provider
        domain={DOMAIN}
        clientId={CLIENTID}
        redirectUri={REDIRECTURI}
        audience={AUTH0_API_IDENTIFIER}
      >
        <Component {...pageProps} />
      </Auth0Provider>
    );
  }
}

export default MyApp;

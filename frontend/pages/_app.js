import React from "react";
import App from "next/app";
import { Auth0Provider } from "use-auth0-hooks";
import { SWRConfig } from "swr";
import { DOMAIN, CLIENTID, REDIRECTURI, AUTH0_API_IDENTIFIER } from "../utils";
import { fetchIt } from "../utils";
import "../css/tailwind.css";

const swrConfigValue = { fetcher: fetchIt };
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
        <SWRConfig value={swrConfigValue}>
          <Component {...pageProps} />
        </SWRConfig>
      </Auth0Provider>
    );
  }
}

export default MyApp;

export const DOMAIN = "dev-s33wz1ho.au.auth0.com";
export const CLIENTID = "dZDIq2j3TkiaXfFtRbm84rn8oCKCydYW";
export const REDIRECTURI =
  process.env.NODE_ENV === "production"
    ? "https://bears04.now.sh/admin"
    : "http://localhost:3000/admin";

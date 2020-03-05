import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

// ENVIRONMENT VARIABLES USED
const NODE_ENV = process.env.NODE_ENV;
const AUTH0_API_IDENTIFIER = process.env.AUTH0_API_IDENTIFIER;
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const isTest = NODE_ENV === "test";

// CREATE JWT OPTIONS
const { cache, audience, issuer, jwksUri, jwksRequestsPerMinute } = {
  cache: !isTest,
  audience: isTest ? "private" : AUTH0_API_IDENTIFIER,
  issuer: isTest ? "master" : `https://${AUTH0_DOMAIN}/`,
  jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  jwksRequestsPerMinute: isTest ? 100 : 1000,
};

// verifies there is a token and that it was verified successfully
export const verifyToken = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache,
    rateLimit: true,
    jwksRequestsPerMinute,
    jwksUri,
  }),

  audience,
  issuer,
  algorithm: ["RS256"],
});

import { RequestHandler } from "express";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import createError from "http-errors";
import { Registry } from "../models";

export const verifyToken = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  audience: process.env.AUTH0_API_IDENTIFIER,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithm: ["RS256"],
});

// compare req.user.sub and registry.userId
export const checkOwnership: RequestHandler = async (req, res, next) => {
  try {
    const { registryId } = req.params;

    // find the registry
    const registry = await Registry.findById(registryId);
    if (!registry) throw createError(404, `Registry (${registryId}) not found`);

    // check if user is the owner
    // if(registry.userId === req.user.sub) return next()

    // throw an error if they aren't
    throw createError(
      403,
      "Sorry, you're not authorized for that (re: ownership)"
    );
  } catch (err) {
    next(err);
  }
};

export const checkAdmin: RequestHandler = async (req, res, next) => {
  const { regsitry } = req.params;

  // if(req.user)
};

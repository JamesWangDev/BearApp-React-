import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import createError from "http-errors";
import { Registry } from "../models";
import { AuthHandler } from "./types";
import { checkPermissions } from "./utils";
import { RequestHandler } from "express";

const NODE_ENV = process.env.NODE_ENV;
const permissionsAdmin = JSON.parse(process.env.PERMISSIONS_ADMIN || "[]");
const permissionsPaidUser = JSON.parse(
  process.env.PERMISSIONS_PAIDUSER || "[]"
);

// checks if the verified user has the paid user permissions
export const checkPaidUser: AuthHandler = async (req, _res, next) => {
  try {
    if (NODE_ENV === "test") return next();
    checkPermissions(req.user?.permissions, permissionsPaidUser);
    next();
  } catch (err) {
    next(err);
  }
};

// checks if the verified user has the admin permissions
export const checkAdmin: AuthHandler = async (req, _res, next) => {
  try {
    if (NODE_ENV === "test") return next();
    checkPermissions(req.user?.permissions, permissionsAdmin);
    next();
  } catch (err) {
    next(err);
  }
};

// compare req.user.sub and registry.userId
// any routes that uses this NEEDS a registryId param
export const checkOwnership: AuthHandler = async (req, _res, next) => {
  try {
    if (NODE_ENV === "test") return next();
    const { registryId } = req.params;

    // find the registry
    const registry = await Registry.findById(registryId);
    if (!registry) throw createError(404, `Registry (${registryId}) not found`);

    // check if user is the owner
    if (registry.userId === req.user?.sub) return next();

    // check if the user is an admin
    checkPermissions(req.user?.permissions, permissionsAdmin, "ownership");

    next();
  } catch (err) {
    next(err);
  }
};

// verifies there is a token and that it was verified successfully
export const verifyToken: RequestHandler = (_req, _res, next) => {
  if (NODE_ENV === "test") {
    return new Promise(resolve => {
      resolve(next());
    });
  }

  return jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: NODE_ENV !== "test",
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),

    audience: process.env.AUTH0_API_IDENTIFIER,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithm: ["RS256"],
  });
};

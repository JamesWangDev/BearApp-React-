import createError from "http-errors";
import { Registry } from "../models";
import {
  AuthHandler,
  checkPermissions,
  permissionsAdmin,
  permissionsPaidUser,
} from "../utils";

// checks if the verified user has the paid user permissions
export const checkPaidUser: AuthHandler = async (req, _res, next) => {
  try {
    checkPermissions(req.user?.permissions, permissionsPaidUser);
    next();
  } catch (err) {
    next(err);
  }
};

// checks if the verified user has the admin permissions
export const checkAdmin: AuthHandler = async (req, _res, next) => {
  try {
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

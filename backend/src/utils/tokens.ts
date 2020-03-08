import { permissionsAdmin, permissionsPaidUser } from "./permissions";

const opts = {
  aud: "private",
  iss: "master",
  sub: "1234567890",
};

export const validTokenAdmin = {
  ...opts,
  permissions: permissionsAdmin,
};

export const validTokenPaidUser = {
  ...opts,
  permissions: permissionsPaidUser,
};

export const invalidTokenAdmin = {
  ...opts,
  permissions: permissionsPaidUser,
};

export const invalidTokenPaidUser = {
  ...opts,
  permissions: [],
};

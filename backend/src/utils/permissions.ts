import createError = require("http-errors");

const PERMISSIONS_ADMIN = process.env.PERMISSIONS_ADMIN;
const PERMISSIONS_PAIDUSER = process.env.PERMISSIONS_PAIDUSER;

// formats error authorizations messages
function createErrMsg(re: string) {
  return createError(401, `Authorization Failed (re: ${re})`);
}

// creates array of permissions
export const permissionsAdmin = JSON.parse(PERMISSIONS_ADMIN || "[]");
export const permissionsPaidUser = JSON.parse(PERMISSIONS_PAIDUSER || "[]");

// throws an error if unsuccessful
export function checkPermissions(
  givenPerms: string[] | undefined,
  neededPerms: string[],
  errMsg: string = "invalid permissions"
) {
  // throw if there are no permissions
  if (!givenPerms || !givenPerms.length || !neededPerms.length) {
    throw createErrMsg("no permissions found");
  }

  // check that the user has the correct permissions
  const isValidPermCheck = neededPerms.every(neededPerm =>
    givenPerms.includes(neededPerm)
  );

  // if it's not valid throw an error
  if (!isValidPermCheck) throw createErrMsg(errMsg);
}

export const getUserId = (userSub?: string) =>
  !userSub ? "" : userSub.split("|")[1];

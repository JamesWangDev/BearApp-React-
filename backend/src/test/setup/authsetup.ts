import createJWKSMock from "mock-jwks";
import * as token from "../../utils";

export default function authSetup() {
  const jwksMock = createJWKSMock(`https://${process.env.AUTH0_DOMAIN}/`);

  const validTokenAdmin = jwksMock.token(token.validTokenAdmin);
  const validTokenPaidUser = jwksMock.token(token.validTokenPaidUser);
  const invalidTokenAdmin = jwksMock.token(token.invalidTokenAdmin);
  const invalidTokenPaidUser = jwksMock.token(token.invalidTokenPaidUser);

  beforeEach(() => jwksMock.start());

  afterEach(async () => await jwksMock.stop());

  return {
    validTokenAdmin,
    validTokenPaidUser,
    invalidTokenAdmin,
    invalidTokenPaidUser,
  };
}

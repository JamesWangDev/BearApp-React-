import dbSetup from "./dbsetup";
import authSetup from "./authsetup";

export default function setup() {
  // sets up an independent mock DB
  dbSetup();

  // sets up a token validation mocker
  // returns a list of valid and invalid tokens
  const tokens = authSetup();

  return tokens;
}

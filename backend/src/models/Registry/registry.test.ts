import Registry from "../Registry";
import { validRegistry, invalidTitle } from "../Registry";

async function registryMocker(newRegistry: {}) {
  let error = "";
  try {
    const registry = new Registry(newRegistry);
    await registry.validate();
  } catch (err) {
    error = err.message;
  }
  return error;
}

const errorMsg = (field: string) => {
  return `Registry validation failed: ${field}: Registry ${field} required`;
};

describe("Registry Model Tests", () => {
  test("Expected successful Registry Validation", async () => {
    const error = await registryMocker(validRegistry);
    expect(error).toBeFalsy();
  });

  test("expected unsuccessful registry validation - title", async () => {
    const error = await registryMocker(invalidTitle);
    expect(error).toBe(errorMsg("name"));
  });
});

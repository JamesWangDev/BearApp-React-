import Registry from "./registry-model";
import {
  validRegistry,
  invalidRegistry,
  invalidTitle,
  invalidDescription,
  invalidP1FullName,
  invalidP2FullName,
  invalidUserId,
  invalidEmail,
  invalidCustomUrl,
} from "./registry-examples";

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
  test("Expected successful registry validation", async () => {
    const error = await registryMocker(validRegistry);
    expect(error).toBeFalsy();
  });

  test("expected unsuccessful registry validation", async () => {
    const error = await registryMocker(invalidRegistry);
    expect(error).toBeTruthy();
  });

  test("expected unsuccessful registry validation - title", async () => {
    const error = await registryMocker(invalidTitle);
    expect(error).toBe(errorMsg("title"));
  });

  test("expected unsuccessful registry validation - description", async () => {
    const error = await registryMocker(invalidDescription);
    expect(error).toBe(errorMsg("description"));
  });

  test("expected unsuccessful registry validation - p1FullName", async () => {
    const error = await registryMocker(invalidP1FullName);
    expect(error).toBe(errorMsg("p1FullName"));
  });

  test("expected unsuccessful registry validation - p2FullName", async () => {
    const error = await registryMocker(invalidP2FullName);
    expect(error).toBe(errorMsg("p2FullName"));
  });

  test("expected unsuccessful registry validation - userId", async () => {
    const error = await registryMocker(invalidUserId);
    expect(error).toBe(errorMsg("userId"));
  });

  test("expected unsuccessful registry validation - email", async () => {
    const error = await registryMocker(invalidEmail);
    expect(error).toBe(errorMsg("email"));
  });

  test("expected unsuccessful registry validation - customUrl", async () => {
    const error = await registryMocker(invalidCustomUrl);
    expect(error).toBe(errorMsg("customUrl"));
  });
});

import Item from "./item-model";
import {
  validItem,
  invalidItem,
  invalidName,
  invalidDescription,
  invalidPrice,
} from "./item-examples";

// used to check model validation rules
async function itemMocker(newItem: {}) {
  let error = "";
  try {
    const item = new Item(newItem);
    await item.validate();
  } catch (err) {
    error = err.message;
  }
  return error;
}

const errorMsg = (field: string) => {
  return `Item validation failed: ${field}: Item ${field} required`;
};

describe("Item Model Tests", () => {
  test("expected successful item validation", async () => {
    const error = await itemMocker(validItem);
    expect(error).toBeFalsy();
  });

  test("expected unsuccessful item validation", async () => {
    const error = await itemMocker(invalidItem);
    expect(error).toBeTruthy();
  });

  test("expected unsuccessful item validation - name", async () => {
    const error = await itemMocker(invalidName);
    expect(error).toBe(errorMsg("name"));
  });

  test("expected unsuccessful item validation - description", async () => {
    const error = await itemMocker(invalidDescription);
    expect(error).toBe(errorMsg("description"));
  });

  test("expected unsuccessful item validation - price", async () => {
    const error = await itemMocker(invalidPrice);
    expect(error).toBe(errorMsg("price"));
  });
});

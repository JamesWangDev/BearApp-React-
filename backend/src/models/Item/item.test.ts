import Item from "./item-model";
import { validItem, invalidItem } from "./item-types";

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

describe("Item Model Tests", () => {
  test("expected successful item validation", async () => {
    const error = await itemMocker(validItem);
    expect(error).toBeFalsy();
  });

  test("expected unsuccessful item validation", async () => {
    const error = await itemMocker(invalidItem);
    expect(error).toBeTruthy();
  });
});

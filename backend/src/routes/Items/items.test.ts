// registryId hasn't been turned on yet, so there are no tests for ...
// ... it, therefore 'getRegistryItems' and 'deleteRegistryItems' ...
// ... controllers still need to still be tested

import { request, dbSetup } from "../../test";
import { validItem, invalidItem } from "../../models/Item";

dbSetup();

const getAllItems = async () => await request.get("/api/items").expect(200);

const getItem = async (itemId: string, status: number) =>
  await request.get(`/api/item/${itemId}`).expect(status);

const createItem = async (item: {}, status: number) =>
  await request
    .post("/api/item")
    .send(item)
    .expect(status);

describe("Item Endpoint Tests", () => {
  describe("Item Creation", () => {
    test("expected to successfully create one item", async () => {
      await createItem(validItem, 201);
    });

    test("expected to unsuccessfully create one item", async () => {
      await createItem(invalidItem, 400);
    });
  });

  describe("Get Item/s", () => {
    test("expected to get all items in DB", async () => {
      const newItem1 = await createItem(validItem, 201);
      const newItem2 = await createItem(validItem, 201);

      const allItems = await getAllItems();
      expect(allItems.body).toHaveLength(2);
      expect(allItems.body).toStrictEqual([newItem1.body, newItem2.body]);
    });

    test("expected no items in test DB", async () => {
      const allItems = await getAllItems();
      expect(allItems.body).toHaveLength(0);
    });

    test("expected to get a single item by itemID", async () => {
      const newItem = await createItem(validItem, 201);
      const itemId = newItem.body._id;

      const foundItem = await getItem(itemId, 200);
      expect(foundItem.body).not.toBeNull();
      expect(foundItem.body).toStrictEqual(newItem.body);
    });

    test("expected to not find a single item", async () => {
      await getItem("invalid-id-string", 400);
    });
  });

  describe("Update/Delete Items", () => {
    test("expected to delete a single item", async () => {
      const newItem = await createItem(validItem, 201);
      const itemId = newItem.body._id;

      const foundItem = await getItem(itemId, 200);
      expect(foundItem.body).not.toBeNull();
      expect(foundItem.body).toStrictEqual(newItem.body);

      const deletedItem = await request
        .delete(`/api/item/${itemId}`)
        .expect(200);
      expect(deletedItem.body).not.toBeNull();
    });

    test("expected to unsuccessfully delete a single item", async () => {
      const newItem = await createItem(validItem, 201);
      const itemId = newItem.body._id;

      const foundItem = await getItem(itemId, 200);
      expect(foundItem.body).not.toBeNull();
      expect(foundItem.body).toStrictEqual(newItem.body);

      await request.delete("/api/item/invalid-id-string").expect(400);
    });

    test("expected to successfully update an item", async () => {
      const newItem = await createItem(validItem, 201);
      const itemId = newItem.body._id;

      const foundItem = await getItem(itemId, 200);
      expect(foundItem.body).not.toBeNull();
      expect(foundItem.body).toStrictEqual(newItem.body);

      await request
        .put(`/api/item/${itemId}`)
        .send({
          name: "New BMW",
          description: "Gonna be the next transporter",
          price: 40000,
        })
        .expect(200);
    });

    test("expected to unsuccessfully update an item", async () => {
      const newItem = await createItem(validItem, 201);
      const itemId = newItem.body._id;

      const foundItem = await getItem(itemId, 200);
      expect(foundItem.body).not.toBeNull();
      expect(foundItem.body).toStrictEqual(newItem.body);

      await request
        .put(`/api/item/${itemId}`)
        .send({ name: -1, price: "BMW" })
        .expect(400);
    });
  });
});

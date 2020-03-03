import { request, dbSetup } from "../../test";
import { validItem, invalidItem } from "../../models/Item";
import { validRegistry } from "../../models/Registry";

dbSetup();

const getAllItems = async () => await request.get("/api/item/all").expect(200);

const getItem = async (itemId: string, status: number) =>
  await request.get(`/api/item/${itemId}`).expect(status);

const createItem = async (registryId: string, item: {}, status: number) =>
  await request
    .post(`/api/item/registry/${registryId}`)
    .send(item)
    .expect(status);

const createRegistry = async (registry: {}, status: number) =>
  await request
    .post("/api/registry")
    .send(registry)
    .expect(status);

const getRegistrybyUrl = async (customUrl: string, status: number) =>
  await request.get(`/api/registry/${customUrl}`).expect(status);

describe("Item Endpoint Tests", () => {
  describe("Item Creation", () => {
    test("expected to successfully create one item", async () => {
      const registry = await createRegistry(validRegistry, 201);
      const registryId = registry.body._id;

      const resp = await createItem(registryId, validItem, 201);
      expect(resp.body.name).toBe(validItem.name);
      expect(resp.body.description).toBe(validItem.description);
      expect(resp.body.price).toBe(validItem.price);
    });

    test("expected to unsuccessfully create one item", async () => {
      const registry = await createRegistry(validRegistry, 201);
      const registryId = registry.body._id;

      const resp = await createItem(registryId, invalidItem, 400);
      expect(resp.body.message).toBe(
        "Item validation failed: description: Item description required, price: Path `price` (-1) is less than minimum allowed value (0)."
      );
    });
  });

  describe("Get Item/s", () => {
    test("expected to get all items in DB", async () => {
      const registry = await createRegistry(validRegistry, 201);
      const registryId = registry.body._id;

      const newItem1 = await createItem(registryId, validItem, 201);
      const newItem2 = await createItem(registryId, validItem, 201);

      const allItems = await getAllItems();
      expect(allItems.body).toHaveLength(2);
      expect(allItems.body).toStrictEqual([newItem1.body, newItem2.body]);
    });

    test("expected no items in test DB", async () => {
      const allItems = await getAllItems();
      expect(allItems.body).toHaveLength(0);
    });

    test("expected to get a single item by itemID", async () => {
      const registry = await createRegistry(validRegistry, 201);
      const registryId = registry.body._id;

      const newItem = await createItem(registryId, validItem, 201);
      const itemId = newItem.body._id;

      const foundItem = await getItem(itemId, 200);
      expect(foundItem.body).not.toBeNull();
      // could check each field invidiually here
      expect(foundItem.body).toStrictEqual(newItem.body);
    });

    test("expected to not find a single invalid item", async () => {
      const item = await getItem("invalid-id-string", 400);
      expect(item.body.message).toBe(
        // eslint-disable-next-line quotes
        'Cast to ObjectId failed for value "invalid-id-string" at path "_id" for model "Item"'
      );
    });
  });

  describe("Update/Delete Items", () => {
    test("expected to delete a single item", async () => {
      const registry = await createRegistry(validRegistry, 201);
      const registryId = registry.body._id;

      const newItem = await createItem(registryId, validItem, 201);
      const itemId = newItem.body._id;

      const foundItem = await getItem(itemId, 200);
      expect(foundItem.body).not.toBeNull();
      // could check each field invidiually here
      expect(foundItem.body).toStrictEqual(newItem.body);

      const deletedItem = await request
        .delete(`/api/item/${itemId}/registry/${registryId}`)
        .expect(200);
      expect(deletedItem.body).not.toBeNull();

      const resp = await getItem(itemId, 404);
      expect(resp.body.message).toBe(`Item (${itemId}) not found`);
    });

    test("expected to unsuccessfully delete a single item", async () => {
      const registry = await createRegistry(validRegistry, 201);
      const registryId = registry.body._id;

      const newItem = await createItem(registryId, validItem, 201);
      const itemId = newItem.body._id;

      const foundItem = await getItem(itemId, 200);
      expect(foundItem.body).not.toBeNull();
      // could check each field invidiually here
      expect(foundItem.body).toStrictEqual(newItem.body);

      const resp = await request
        .delete(`/api/item/invalid-id-string/registry/${registryId}`)
        .expect(400);
      expect(resp.body.message).toBe(
        // eslint-disable-next-line quotes
        'Cast to ObjectId failed for value "invalid-id-string" at path "_id" for model "Item"'
      );
    });

    test("expected to successfully delete multiple items", async () => {
      const registry = await createRegistry(validRegistry, 201);
      const registryId = registry.body._id;
      const registryUrl = registry.body.customUrl;

      const newItem1 = await createItem(registryId, validItem, 201);
      const newItem2 = await createItem(registryId, validItem, 201);
      const itemId1 = newItem1.body._id;
      const itemId2 = newItem2.body._id;
      const arrayOfIds = JSON.stringify([itemId1, itemId2]);

      const resp = await request
        .delete(`/api/item/registry/${registryId}`)
        .send({ arrayOfIds })
        .expect(200);
      expect(resp.body.message).toBe(
        "Updated registry items and deleted 2/2 items"
      );

      // check that the items don't exist now
      const item1 = await getItem(itemId1, 404);
      const item2 = await getItem(itemId2, 404);
      expect(item1.body.message).toBe(`Item (${itemId1}) not found`);
      expect(item2.body.message).toBe(`Item (${itemId2}) not found`);

      // check that the items ids aren't in the registry items array
      const updatedRegistry = await getRegistrybyUrl(registryUrl, 200);
      expect(updatedRegistry.body.items).not.toContain(itemId1);
      expect(updatedRegistry.body.items).not.toContain(itemId2);
    });

    test("expected to unsuccessfully delete multiple items - missing arrayOfIds", async () => {
      const registry = await createRegistry(validRegistry, 201);
      const registryId = registry.body._id;

      await createItem(registryId, validItem, 201);
      await createItem(registryId, validItem, 201);

      const resp = await request
        .delete(`/api/item/registry/${registryId}`)
        .expect(400);
      expect(resp.body.message).toBe("Please pass arrayOfIds in the body");
    });

    test("expected to unsuccessfully delete multiple items - empty arrayOfIds", async () => {
      const registry = await createRegistry(validRegistry, 201);
      const registryId = registry.body._id;

      await createItem(registryId, validItem, 201);
      await createItem(registryId, validItem, 201);
      const arrayOfIds = JSON.stringify([]);

      const resp = await request
        .delete(`/api/item/registry/${registryId}`)
        .send({ arrayOfIds })
        .expect(400);
      expect(resp.body.message).toBe("You didn't put any _id's in arrayOfIds");
    });

    test("expected to unsuccessfully delete multiple items - invalid id in arrayOfIds", async () => {
      const registry = await createRegistry(validRegistry, 201);
      const registryId = registry.body._id;

      const newItem1 = await createItem(registryId, validItem, 201);
      await createItem(registryId, validItem, 201);
      const itemId1 = newItem1.body._id;
      const arrayOfIds = JSON.stringify([itemId1, "invalidId"]);

      const resp = await request
        .delete(`/api/item/registry/${registryId}`)
        .send({ arrayOfIds })
        .expect(400);
      expect(resp.body.message).toBe(
        "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters"
      );
    });

    test("expected to unsuccessfully delete multiple items - invalid registry", async () => {
      const registry = await createRegistry(validRegistry, 201);
      const registryId = registry.body._id;
      const invalidRegistryId = registryId + "2";

      const newItem1 = await createItem(registryId, validItem, 201);
      const newItem2 = await createItem(registryId, validItem, 201);
      const itemId1 = newItem1.body._id;
      const itemId2 = newItem2.body._id;
      const arrayOfIds = JSON.stringify([itemId1, itemId2]);

      const resp = await request
        .delete(`/api/item/registry/${invalidRegistryId}`)
        .send({ arrayOfIds })
        .expect(400);
      expect(resp.body.message).toBe(
        `Cast to ObjectId failed for value \"${invalidRegistryId}\" at path \"_id\" for model \"Registry\"`
      );
    });

    test("expected to successfully update an item", async () => {
      const registry = await createRegistry(validRegistry, 201);
      const registryId = registry.body._id;

      const newItem = await createItem(registryId, validItem, 201);
      const itemId = newItem.body._id;

      const foundItem = await getItem(itemId, 200);
      expect(foundItem.body).not.toBeNull();
      // could check each field invidiually here
      expect(foundItem.body).toStrictEqual(newItem.body);

      const updateObj = {
        name: "New BMW",
        description: "Gonna be the next transporter",
        price: 40000,
      };
      const updatedItem = await request
        .put(`/api/item/${itemId}`)
        .send(updateObj)
        .expect(200);
      expect(updatedItem.body.name).toBe(updateObj.name);
      expect(updatedItem.body.description).toBe(updateObj.description);
      expect(updatedItem.body.price).toBe(updateObj.price);
    });

    test("expected to unsuccessfully update an item", async () => {
      const registry = await createRegistry(validRegistry, 201);
      const registryId = registry.body._id;

      const newItem = await createItem(registryId, validItem, 201);
      const itemId = newItem.body._id;

      const foundItem = await getItem(itemId, 200);
      expect(foundItem.body).not.toBeNull();
      // could check each field invidiually here
      expect(foundItem.body).toStrictEqual(newItem.body);

      const error = await request
        .put(`/api/item/${itemId}`)
        .send({ price: "BMW" })
        .expect(400);

      expect(error.body.message).toBe(
        // eslint-disable-next-line quotes
        'Cast to number failed for value "BMW" at path "price"'
      );
    });
  });
});

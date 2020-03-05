import { setup, mockControllers } from "../../test";
import { validItem, invalidItem } from "../../models/Item";
import { validRegistry } from "../../models/Registry";

const {
  createItem,
  createRegistry,
  deleteItem,
  deleteManyItems,
  getAllItems,
  getItem,
  getRegistrybyUrl,
  updateItem,
} = mockControllers;

describe("Item Endpoint Tests", () => {
  const tokens = setup();

  describe("Item Creation", () => {
    test("expected to successfully create one item", async () => {
      const token = tokens.validTokenPaidUser;

      const registry = await createRegistry(validRegistry, 201, token);
      const registryId = registry.body._id;

      const resp = await createItem(registryId, validItem, 201, token);
      expect(resp.body.name).toBe(validItem.name);
      expect(resp.body.description).toBe(validItem.description);
      expect(resp.body.price).toBe(validItem.price);
    });

    test("expected to unsuccessfully create one item", async () => {
      const token = tokens.validTokenPaidUser;

      const registry = await createRegistry(validRegistry, 201, token);
      const registryId = registry.body._id;

      const resp = await createItem(registryId, invalidItem, 400, token);
      expect(resp.body.message).toBe(
        "Item validation failed: description: Item description required, price: Path `price` (-1) is less than minimum allowed value (0)."
      );
    });
  });

  describe("Get Item/s", () => {
    test("expected to get all items in DB", async () => {
      const token = tokens.validTokenPaidUser;

      const registry = await createRegistry(validRegistry, 201, token);
      const registryId = registry.body._id;

      const newItem1 = await createItem(registryId, validItem, 201, token);
      const newItem2 = await createItem(registryId, validItem, 201, token);

      const allItems = await getAllItems();
      expect(allItems.body).toHaveLength(2);
      expect(allItems.body).toStrictEqual([newItem1.body, newItem2.body]);
    });

    test("expected no items in test DB", async () => {
      const allItems = await getAllItems();
      expect(allItems.body).toHaveLength(0);
    });

    test("expected to get a single item by itemID", async () => {
      const token = tokens.validTokenPaidUser;

      const registry = await createRegistry(validRegistry, 201, token);
      const registryId = registry.body._id;

      const newItem = await createItem(registryId, validItem, 201, token);
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
      const token = tokens.validTokenPaidUser;

      const registry = await createRegistry(validRegistry, 201, token);
      const registryId = registry.body._id;

      const newItem = await createItem(registryId, validItem, 201, token);
      const itemId = newItem.body._id;

      const foundItem = await getItem(itemId, 200);
      expect(foundItem.body).not.toBeNull();
      // could check each field invidiually here
      expect(foundItem.body).toStrictEqual(newItem.body);

      const deletedItem = await deleteItem(itemId, registryId, 200, token);
      expect(deletedItem.body).not.toBeNull();

      const resp = await getItem(itemId, 404);
      expect(resp.body.message).toBe(`Item (${itemId}) not found`);
    });

    test("expected to unsuccessfully delete a single item", async () => {
      const token = tokens.validTokenPaidUser;

      const registry = await createRegistry(validRegistry, 201, token);
      const registryId = registry.body._id;

      const newItem = await createItem(registryId, validItem, 201, token);
      const itemId = newItem.body._id;

      const foundItem = await getItem(itemId, 200);
      expect(foundItem.body).not.toBeNull();
      // could check each field invidiually here
      expect(foundItem.body).toStrictEqual(newItem.body);

      const resp = await deleteItem(
        "invalid-id-string",
        registryId,
        400,
        token
      );
      expect(resp.body.message).toBe(
        // eslint-disable-next-line quotes
        'Cast to ObjectId failed for value "invalid-id-string" at path "_id" for model "Item"'
      );
    });

    test("expected to successfully delete multiple items", async () => {
      const token = tokens.validTokenPaidUser;

      const registry = await createRegistry(validRegistry, 201, token);
      const registryId = registry.body._id;
      const registryUrl = registry.body.customUrl;

      const newItem1 = await createItem(registryId, validItem, 201, token);
      const newItem2 = await createItem(registryId, validItem, 201, token);
      const itemId1 = newItem1.body._id;
      const itemId2 = newItem2.body._id;
      const arrayOfIds = JSON.stringify([itemId1, itemId2]);

      const resp = await deleteManyItems(registryId, arrayOfIds, 200, token);
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
      const token = tokens.validTokenPaidUser;

      const registry = await createRegistry(validRegistry, 201, token);
      const registryId = registry.body._id;

      await createItem(registryId, validItem, 201, token);
      await createItem(registryId, validItem, 201, token);

      const resp = await deleteManyItems(registryId, "", 400, token);
      expect(resp.body.message).toBe("Please pass arrayOfIds in the body");
    });

    test("expected to unsuccessfully delete multiple items - empty arrayOfIds", async () => {
      const token = tokens.validTokenPaidUser;

      const registry = await createRegistry(validRegistry, 201, token);
      const registryId = registry.body._id;

      await createItem(registryId, validItem, 201, token);
      await createItem(registryId, validItem, 201, token);
      const arrayOfIds = JSON.stringify([]);

      const resp = await deleteManyItems(registryId, arrayOfIds, 400, token);
      expect(resp.body.message).toBe("You didn't put any _id's in arrayOfIds");
    });

    test("expected to unsuccessfully delete multiple items - invalid id in arrayOfIds", async () => {
      const token = tokens.validTokenPaidUser;

      const registry = await createRegistry(validRegistry, 201, token);
      const registryId = registry.body._id;

      const newItem1 = await createItem(registryId, validItem, 201, token);
      await createItem(registryId, validItem, 201, token);
      const itemId1 = newItem1.body._id;
      const arrayOfIds = JSON.stringify([itemId1, "invalidId"]);

      const resp = await deleteManyItems(registryId, arrayOfIds, 400, token);
      expect(resp.body.message).toBe(
        "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters"
      );
    });

    test("expected to unsuccessfully delete multiple items - invalid registry", async () => {
      const token = tokens.validTokenPaidUser;

      const registry = await createRegistry(validRegistry, 201, token);
      const registryId = registry.body._id;
      const invalidRegistryId = registryId + "2";

      const newItem1 = await createItem(registryId, validItem, 201, token);
      const newItem2 = await createItem(registryId, validItem, 201, token);
      const itemId1 = newItem1.body._id;
      const itemId2 = newItem2.body._id;
      const arrayOfIds = JSON.stringify([itemId1, itemId2]);

      const resp = await deleteManyItems(
        invalidRegistryId,
        arrayOfIds,
        400,
        token
      );
      expect(resp.body.message).toBe(
        `Cast to ObjectId failed for value \"${invalidRegistryId}\" at path \"_id\" for model \"Registry\"`
      );
    });

    test("expected to successfully update an item", async () => {
      const token = tokens.validTokenPaidUser;

      const registry = await createRegistry(validRegistry, 201, token);
      const registryId = registry.body._id;

      const newItem = await createItem(registryId, validItem, 201, token);
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
      const updatedItem = await updateItem(
        itemId,
        registryId,
        updateObj,
        200,
        token
      );
      expect(updatedItem.body.name).toBe(updateObj.name);
      expect(updatedItem.body.description).toBe(updateObj.description);
      expect(updatedItem.body.price).toBe(updateObj.price);
    });

    test("expected to unsuccessfully update an item", async () => {
      const token = tokens.validTokenPaidUser;

      const registry = await createRegistry(validRegistry, 201, token);
      const registryId = registry.body._id;

      const newItem = await createItem(registryId, validItem, 201, token);
      const itemId = newItem.body._id;

      const foundItem = await getItem(itemId, 200);
      expect(foundItem.body).not.toBeNull();
      // could check each field invidiually here
      expect(foundItem.body).toStrictEqual(newItem.body);

      const error = await updateItem(
        itemId,
        registryId,
        { price: "BMW" },
        400,
        token
      );

      expect(error.body.message).toBe(
        // eslint-disable-next-line quotes
        'Cast to number failed for value "BMW" at path "price"'
      );
    });
  });
});

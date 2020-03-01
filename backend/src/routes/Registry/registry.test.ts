import { request, dbSetup } from "../../test";
import { validRegistry, invalidRegistry } from "../../models/Registry";

dbSetup();

const getAllRegistries = async () =>
  await request.get("/api/registry").expect(200);

const getRegistrybyUrl = async (customUrl: string, status: number) =>
  await request.get(`/api/registry/${customUrl}`).expect(status);

const createRegistry = async (registry: {}, status: number) =>
  await request
    .post("/api/registry")
    .send(registry)
    .expect(status);

describe("Registry Endpoint Test", () => {
  describe("Registry Creation", () => {
    test("expected to successfully create one registry", async () => {
      const resp = await createRegistry(validRegistry, 201);
      expect(resp.body.title).toBe(validRegistry.title);
      expect(resp.body.description).toBe(validRegistry.description);
      expect(resp.body.p1FullName).toBe(validRegistry.p1FullName);
      expect(resp.body.p2FullName).toBe(validRegistry.p2FullName);
      expect(resp.body.email).toBe(validRegistry.email);
      expect(resp.body.userId).toBe(validRegistry.userId);
      expect(resp.body.customUrl).toBe(validRegistry.customUrl);
    });

    test("expected to unsuccessfully create one registry", async () => {
      const resp = await createRegistry(invalidRegistry, 400);
      expect(resp.body.message).toBe(
        "Registry validation failed: p1FullName: Registry p1FullName required, description: Registry description required, title: Registry title required"
      );
    });

    test("expected to unsuccessfully create a registry with the same customUrl", async () => {
      const newRegistry1 = await createRegistry(validRegistry, 201);
      const newRegistry2 = await createRegistry(validRegistry, 400);
      expect(newRegistry2.body.message).toBe(
        `E11000 duplicate key error dup key: { : \"${newRegistry1.body.customUrl}"\ }`
      );
    });
  });

  describe("Get Registry/s", () => {
    test("Expected to get all items in DB", async () => {
      const newRegistry1 = await createRegistry(validRegistry, 201);
      const newRegistry2 = await createRegistry(
        { ...validRegistry, customUrl: "newRegistry2" },
        201
      );

      const allRegistries = await getAllRegistries();
      expect(allRegistries.body).toHaveLength(2);
      expect(allRegistries.body).toStrictEqual([
        newRegistry1.body,
        newRegistry2.body,
      ]);
    });

    test("expected no Registries in test DB", async () => {
      const allRegistries = await getAllRegistries();
      expect(allRegistries.body).toHaveLength(0);
    });

    test("expected to get a single registry by customUrl", async () => {
      const newRegistry = await createRegistry(validRegistry, 201);
      const customUrl = newRegistry.body.customUrl;

      const foundRegistry = await getRegistrybyUrl(customUrl, 200);
      expect(foundRegistry.body).not.toBeNull();
      // could check each field invidiually here
      expect(foundRegistry.body).toStrictEqual(foundRegistry.body);
    });

    test("expected to not find a single invalid registry", async () => {
      const newRegistry = await createRegistry(validRegistry, 201);
      const customUrl = newRegistry.body.customUrl + "invalid";

      const foundRegistry = await getRegistrybyUrl(customUrl, 404);
      expect(foundRegistry.body.message).toBe(
        `Registry (${customUrl}) not found`
      );
    });
  });

  describe("Update/Delete Registry", () => {
    test("expected to successfully delete a single registry", async () => {
      const newRegistry = await createRegistry(validRegistry, 201);
      const registryId = newRegistry.body._id;
      const customUrl = newRegistry.body.customUrl;

      const foundRegistry = await getRegistrybyUrl(customUrl, 200);
      expect(foundRegistry.body).not.toBeNull();
      // could check each field invidiually here
      expect(foundRegistry.body).toStrictEqual(newRegistry.body);

      const deletedRegistry = await request
        .delete(`/api/registry/${registryId}`)
        .expect(200);
      expect(deletedRegistry.body).not.toBeNull();

      const resp = await getRegistrybyUrl(customUrl, 404);
      expect(resp.body.message).toBe(`Registry (${customUrl}) not found`);
    });

    test("expected to unsuccessfully delete a single registry", async () => {
      const newRegistry = await createRegistry(validRegistry, 201);
      const customUrl = newRegistry.body.customUrl;

      const foundRegistry = await getRegistrybyUrl(customUrl, 200);
      expect(foundRegistry.body).not.toBeNull();
      // could check each field invidiually here
      expect(foundRegistry.body).toStrictEqual(newRegistry.body);

      const deletedRegistry = await request
        .delete("/api/registry/invalid-id-string")
        .expect(400);
      expect(deletedRegistry.body.message).toBe(
        // eslint-disable-next-line quotes
        'Cast to ObjectId failed for value "invalid-id-string" at path "_id" for model "Registry"'
      );
    });

    test("expected to successfully update a single registry", async () => {
      const newRegistry = await createRegistry(validRegistry, 201);
      const registryId = newRegistry.body._id;
      const customUrl = newRegistry.body.customUrl;

      const foundRegistry = await getRegistrybyUrl(customUrl, 200);
      expect(foundRegistry.body).not.toBeNull();
      // could check each field invidiually here
      expect(foundRegistry.body).toStrictEqual(newRegistry.body);

      const updateObj = {
        title: "New Title",
        description: "New Description",
        customUrl: "coolNewUrl",
      };
      const updatedRegistry = await request
        .put(`/api/registry/${registryId}`)
        .send(updateObj)
        .expect(200);
      expect(updatedRegistry.body.title).toBe(updateObj.title);
      expect(updatedRegistry.body.description).toBe(updateObj.description);
      expect(updatedRegistry.body.customUrl).toBe(updateObj.customUrl);
    });

    test("expected to unsuccessfully update a single registry", async () => {
      const newRegistry = await createRegistry(validRegistry, 201);
      const invalidRegistryId = newRegistry.body._id + "-invalid";
      const customUrl = newRegistry.body.customUrl;

      const foundRegistry = await getRegistrybyUrl(customUrl, 200);
      expect(foundRegistry.body).not.toBeNull();
      // could check each field invidiually here
      expect(foundRegistry.body).toStrictEqual(newRegistry.body);

      const updateObj = {
        title: "New Title",
        description: "New Description",
        customUrl: "coolNewUrl",
      };
      const error = await request
        .put(`/api/registry/${invalidRegistryId}`)
        .send(updateObj)
        .expect(400);

      expect(error.body.message).toBe(
        `Cast to ObjectId failed for value "${invalidRegistryId}" at path "_id" for model "Registry"`
      );
    });
  });
});

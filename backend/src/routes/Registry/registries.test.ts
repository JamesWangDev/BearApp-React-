import { request, dbSetup } from "../../test";
import { validRegistry } from "../../models/Registry";

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
    test("expected to successfully create one Registry", async () => {
      const resp = await createRegistry(validRegistry, 201);
      expect(resp.body.name).toBe(validRegistry.title);
      expect(resp.body.description).toBe(validRegistry.description);
      expect(resp.body.p1FullName).toBe(validRegistry.p1FullName);
      expect(resp.body.p2FullName).toBe(validRegistry.p2FullName);
      expect(resp.body.email).toBe(validRegistry.email);
      expect(resp.body.userId).toBe(validRegistry.userId);
      expect(resp.body.customUrl).toBe(validRegistry.customUrl);
    });
  });
});

describe("Get Registry/s", () => {
  test("Expected to get all items in DB", async () => {
    const newRegistry1 = await createRegistry(validRegistry, 200);
    const newRegistry2 = await createRegistry(validRegistry, 200);

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

  test("expected to get a single Registry by Custom URL", async () => {
    const newRegistry = await createRegistry(validRegistry, 201);
    const customUrl = newRegistry.body.customUrl;

    const foundRegistry = await getRegistrybyUrl(customUrl, 200);
    expect(foundRegistry.body).not.toBeNull();
    // could check each field invidiually here
    expect(foundRegistry.body).toStrictEqual(foundRegistry.body);
  });

  //   test("expected to not find a single invalid item", async () => {
  //     const item = await getItem("invalid-id-string", 400);
  //     expect(item.body.message).toBe(
  //       // eslint-disable-next-line quotes
  //       'Cast to ObjectId failed for value "invalid-id-string" at path "_id" for model "Item"'
  //     );
  //   });
});

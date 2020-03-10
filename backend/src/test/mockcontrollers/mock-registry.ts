import request from "../request";

export async function getAllRegistries() {
  return await request.get("/api/registry").expect(200);
}

export async function getRegistrybyUrl(customUrl: string, status: number) {
  return await request.get(`/api/registry/${customUrl}`).expect(status);
}

export async function createRegistry(
  registry: {},
  status: number,
  token: string
) {
  return await request
    .post("/api/registry")
    .send(registry)
    .set("Authorization", `Bearer ${token}`)
    .expect(status);
}

export async function deleteRegistry(
  registryId: string,
  status: number,
  token: string
) {
  return await request
    .delete(`/api/registry/${registryId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(status);
}

export async function updateOneRegistry(
  registryId: string,
  registry: {},
  status: number,
  token: string
) {
  return await request
    .put(`/api/registry/${registryId}`)
    .send(registry)
    .set("Authorization", `Bearer ${token}`)
    .expect(status);
}

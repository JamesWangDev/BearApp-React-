import request from "../request";

export async function getAllItems() {
  return await request.get("/api/item/all").expect(200);
}

export async function getItem(itemId: string, status: number) {
  return await request.get(`/api/item/${itemId}`).expect(status);
}

export async function createItem(
  registryId: string,
  item: {},
  status: number,
  token: string
) {
  return await request
    .post(`/api/item/registry/${registryId}`)
    .send(item)
    .set("Authorization", `Bearer ${token}`)
    .expect(status);
}

export async function deleteItem(
  itemId: string,
  registryId: string,
  status: number,
  token: string
) {
  return await request
    .delete(`/api/item/${itemId}/registry/${registryId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(status);
}

export async function deleteManyItems(
  registryId: string,
  arrayOfIds: string | undefined,
  status: number,
  token: string
) {
  return await request
    .delete(`/api/item/registry/${registryId}`)
    .send({ arrayOfIds })
    .set("Authorization", `Bearer ${token}`)
    .expect(status);
}

export async function updateItem(
  itemId: string,
  registryId: string,
  item: {},
  status: number,
  token: string
) {
  return await request
    .put(`/api/item/${itemId}/registry/${registryId}`)
    .send(item)
    .set("Authorization", `Bearer ${token}`)
    .expect(status);
}

export async function purchaseItem(
  itemId: string,
  purchaseInfo: {},
  status: number
) {
  return await request
    .post(`/api/item/${itemId}`)
    .send(purchaseInfo)
    .expect(status);
}

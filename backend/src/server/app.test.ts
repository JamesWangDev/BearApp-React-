import { request } from "../test";

const invalidRoute = "/noapi";

describe("App Tests", () => {
  test(`expected unsuccessful ${invalidRoute} route`, async () => {
    const resp = await request.get(invalidRoute).expect(404);
    expect(resp.body.message).toBe(`Invalid route: ${invalidRoute}`);
  });

  test("expected successful '/api' route", async () => {
    const resp = await request.get("/api");
    expect(resp.status).toBe(200);
  });
});

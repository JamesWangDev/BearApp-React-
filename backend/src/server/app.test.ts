import supertest from "supertest";
import app from "./app";

const request = supertest(app);
const invalidRoute = "/noapi";

describe("App Tests", () => {
  test(`expected unsuccessful ${invalidRoute} route`, async () => {
    const resp = await request
      .get(invalidRoute)
      // .set("Accept", "application/json")
      // .expect("Content-Type", /json/)
      .expect(404);
    expect(resp.body.message).toBe(`Invalid route: ${invalidRoute}`);
  });

  test("expected successful '/api' route", async () => {
    const resp = await request.get("/api");
    expect(resp.status).toBe(200);
  });
});

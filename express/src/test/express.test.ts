import request from "supertest";
import app from "./sumple";

describe("GET /transactions", () => {
  it("should return a list of transactions", async () => {
    const response = await request(app).get("/transactions");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, amount: 100 }]);
  });
});

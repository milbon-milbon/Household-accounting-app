import request from "supertest";
import app from "../app";
import http from "http";

jest.setTimeout(10000); // タイムアウトを10秒に設定

let server: http.Server;

beforeAll((done) => {
  server = app.listen(4000, done);
});

afterAll((done) => {
  server.close(() => {
    done();
  });
});

// 正常系: GET / transactions(フィールド);
describe("GET /transactions", () => {
  it("should return a list of transactions", async () => {
    const response = await request(app).get("/transactions");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          amount: expect.any(Number),
          date: expect.any(String),
          type: expect.any(String),
          details: expect.any(String),
          userId: expect.any(Number),
        }),
      ]),
    );
  });
});

// 正常系: POST /transactions
describe("POST /transactions", () => {
  it("should create a new transaction", async () => {
    const newTransaction = {
      date: "2024-08-11T10:49:13.977Z",
      amount: 1000,
      type: "入金",
      details: "Test Deposit",
      userId: 1,
    };

    const response = await request(app)
      .post("/transactions")
      .send(newTransaction);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newTransaction);
  });
});
//   // 異常系: 必須フィールドが不足している場合
//   it("should return 400 if required fields are missing", async () => {
//     const response = await request(app).post("/transactions").send({});
//     expect(response.status).toBe(400);
//   });
// });

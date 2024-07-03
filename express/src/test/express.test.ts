import request from "supertest";
import app from "../app";

// 正常系: GET /transactions（値）
describe("GET /transactions", () => {
  it("should return a list of transactions", async () => {
    const response = await request(app).get("/transactions");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        date: "2024-07-01T10:49:13.977Z",
        amount: 1000,
        type: "入金",
        details: "Initial Deposit",
        userId: 1,
      },
      {
        id: 2,
        date: "2024-07-01T10:49:13.977Z",
        amount: 500,
        type: "出金",
        details: "Grocery Shopping",
        userId: 2,
      },
      {
        id: 3,
        date: "2024-07-10T00:00:00.000Z",
        amount: 2000,
        type: "入金",
        details: "バナナ",
        userId: 2,
      },
    ]);
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
      date: "2024-07-01T10:49:13.977Z",
      amount: 1000,
      type: "入金",
      details: "Test Deposit",
      userId: 1,
    };

    console.log("Sending transaction:", newTransaction); // 送信するデータをログ出力

    const response = await request(app)
      .post("/transactions")
      .send(newTransaction);

    console.log("Received response:", response.body); // レスポンスをログ出力

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

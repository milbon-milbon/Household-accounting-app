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
// 異常系: POST /必須フィールドが不足している場合
it("should return 400 if required fields are missing", async () => {
  const response = await request(app).post("/transactions").send({});
  expect(response.status).toBe(400);
});

// 境界数値系: POST /typeフィールドが192文字の場合
it("should return 400 if `type` field exceeds the maximum length", async () => {
  // 192文字以上のtypeフィールドを含むデータ
  const newTransaction = {
    date: "2024-08-11T10:49:13.977Z",
    amount: 1000,
    type: "a".repeat(192), // 192文字の長い文字列
    details: "Test Deposit",
    userId: 1,
  };

  const response = await request(app)
    .post("/transactions")
    .send(newTransaction);

  expect(response.status).toBe(400);
  expect(response.body.errors).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        param: "type",
        msg: "Type must be at most 191 characters long.",
      }),
    ]),
  );
});

// 境界数値系: POST /typeフィールドが191文字の場合
it("should create a new transaction", async () => {
  const newTransaction = {
    date: "2024-08-11T10:49:13.977Z",
    amount: 1000,
    type: "a".repeat(191), // 192文字の長い文字列
    details: "Test Deposit",
    userId: 1,
  };

  const response = await request(app)
    .post("/transactions")
    .send(newTransaction);

  expect(response.status).toBe(201);
  expect(response.body).toMatchObject(newTransaction);
});

// 境界数値系: POST /detailsフィールドが192文字の場合
it("should return 400 if `details` field exceeds the maximum length", async () => {
  // 192文字以上のtypeフィールドを含むデータ
  const newTransaction = {
    date: "2024-08-11T10:49:13.977Z",
    amount: 1000,
    type: "出金",
    details: "a".repeat(192), // 192文字の長い文字列
    userId: 1,
  };

  const response = await request(app)
    .post("/transactions")
    .send(newTransaction);

  expect(response.status).toBe(400);
  expect(response.body.errors).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        param: "details",
        msg: "Type must be at most 191 characters long.",
      }),
    ]),
  );
});

// 境界数値系: POST /detailsフィールドが191文字の場合
it("should create a new transaction", async () => {
  const newTransaction = {
    date: "2024-08-11T10:49:13.977Z",
    amount: 1000,
    type: "出金",
    details: "a".repeat(191), // 191文字の長い文字列
    userId: 1,
  };

  const response = await request(app)
    .post("/transactions")
    .send(newTransaction);

  expect(response.status).toBe(201);
  expect(response.body).toMatchObject(newTransaction);
});

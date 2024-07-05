import request from "supertest";
import app from "../app";
import http from "http";

describe("PUT /transactions/:id", () => {
  let server: http.Server;

  beforeAll((done) => {
    server = app.listen(4000, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  //正常系
  it("should update a transaction", async () => {
    const updatedTransaction = {
      date: "2024-07-05T10:49:13.977Z",
      amount: 1500,
      type: "出金",
      details: "更新したよ❣",
      userId: 1,
    };
    const response = await request(app)
      .put("/transactions/135")
      .send(updatedTransaction);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedTransaction);
  });

  //異常系
  it("should return 400 if ID is not a number", async () => {
    const updatedTransaction = {
      date: "2024-08-11T10:49:13.977Z",
      amount: 1500,
      type: "出金",
      details: "Updated Deposit",
      userId: 1,
    };
    const response = await request(app)
      .put("/transactions/abc")
      .send(updatedTransaction);

    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe("Invalid ID format.");
  });

  //異常系
  it("should return 404 if transaction does not exist", async () => {
    const updatedTransaction = {
      date: "2024-08-11T10:49:13.977Z",
      amount: 1500,
      type: "出金",
      details: "Updated Deposit",
      userId: 1,
    };
    const response = await request(app)
      .put("/transactions/9999")
      .send(updatedTransaction);

    expect(response.status).toBe(404);
    expect(response.text).toBe("取引が見つかりません。");
  });

  //異常系※モックが必要なため、コメントアウトステイ
  //   it("should return 500 if update fails", async () => {
  //     const updatedTransaction = {
  //       date: "2024-08-11T10:49:13.977Z",
  //       amount: 1500,
  //       type: "出金",
  //       details: "Updated Deposit",
  //       userId: 1,
  //     };
  //     const response = await request(app).put("/transactions/100").send({});
  //     console.log("Response:", response.body); // レスポンスの内容をログ出力
  //     expect(response.status).toBe(500);
  //     expect(response.body.error).toBe("取引の更新に失敗しました。");
  //   });
});

import request from "supertest";
import app from "../app";
import http from "http";

describe("DELETE /transactions/:id", () => {
  let server: http.Server;

  beforeAll((done) => {
    server = app.listen(4000, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  //正常系
  it("should delete a transaction", async () => {
    const response = await request(app).delete("/transactions/156");
    expect(response.status).toBe(204);
  });

  //異常系
  it("should return 400 if ID is not a number", async () => {
    const response = await request(app).delete("/transactions/abc");
    expect(response.status).toBe(400);
    expect(response.text).toBe("無効なIDです。");
  });

  //異常系
  it("should return 404 if transaction does not exist", async () => {
    const response = await request(app).delete("/transactions/9999");
    expect(response.status).toBe(404);
    expect(response.text).toBe("取引が見つかりません。");
  });

  //異常系※モック必要なため、コメントアウトステイ
  //   it("should return 500 if delete fails", async () => {
  //     const response = await request(app).delete("/transactions/51");
  //     expect(response.status).toBe(500);
  //     expect(response.body.error).toBe("取引の削除に失敗しました。");
  //   });
});

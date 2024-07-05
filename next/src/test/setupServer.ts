// src/test/setupServer.ts
import app from "../../../express/src/server"; // サーバーのエントリーポイントを正しくインポート
import http from "http";

let server: http.Server;

beforeAll((done) => {
  server = app.listen(4000, () => {
    console.log("Test server running on port 4000");
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    console.log("Test server stopped");
    done();
  });
});

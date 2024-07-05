import { render, screen, waitFor } from "@testing-library/react";
import { expect, test } from "@jest/globals";
import "@testing-library/jest-dom";
import HomePage from "../app/page";
import React from "react";
import app from "../../../express/src/app"; // サーバーファイルの正しいパスを指定
import http from "http";

describe("PUT /transactions/:id", () => {
  let server: http.Server;

  beforeAll((done) => {
    server = app.listen(4000, done);
  });

  afterAll((done) => {
    server.close(done);
  });
});

//正常系
test("renders data when fetched successfully", async () => {
  render(<HomePage />);

  // レンダリングの確認:
  expect(screen.getByText(/Loading.../i)).toBeTruthy();

  // データが表示されるまで待機
  await waitFor(() => screen.getByText(/取引明細/i));

  // データ表示の確認:データの取得:
  expect(screen.getByText(/取引明細/i)).toBeTruthy();
});

//異常系※モックを使用するほうがよさそうなので、express同様コメントアウトステイ
// test("renders error message when fetch fails", async () => {
//   // 環境変数を不正なURLに設定
//   process.env.NEXT_PUBLIC_API_URL = "http://invalid-url";
//   render(<HomePage />);

//   // データがロードされるのを待つ
//   await waitFor(() => {
//     expect(
//       screen.getByText(/取引の取得中にエラーが発生しました/i),
//     ).toBeTruthy();
//   });

//   render(<HomePage />);

//   // ローディングメッセージの表示を確認
//   expect(screen.getByText(/Loading.../i)).toBeTruthy();

//   // エラーメッセージが表示されるまで待機
//   await waitFor(() => {
//     console.log(screen.debug()); // ここでDOMを出力して確認する
//     expect(
//       screen.getByText(/取引の取得中にエラーが発生しました/i),
//     ).toBeTruthy();
//   });

//   // 表示されたエラーメッセージを確認
//   expect(
//     screen.getByText(/取引の取得中にエラーが発生しました/i),
//   ).toBeTruthy();
// });

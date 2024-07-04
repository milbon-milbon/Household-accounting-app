import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "../app/page";

process.env.NEXT_PUBLIC_API_URL = "http://localhost:4000";

//正常系
test("renders data when fetched successfully", async () => {
  render(<HomePage />);

  // レンダリングの確認:
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  // データが表示されるまで待機
  await waitFor(() => screen.getByText(/取引明細/i));

  // データ表示の確認:データの取得:
  expect(screen.getByText(/取引明細/i)).toBeInTheDocument();
});

// test("renders error message when fetch fails", async () => {
//   // 環境変数を不正なURLに設定
//   process.env.NEXT_PUBLIC_API_URL = "http://invalid-url";
//   render(<HomePage />);

//   // データがロードされるのを待つ
//   await waitFor(() => {
//     expect(
//       screen.getByText(/取引の取得中にエラーが発生しました/i),
//     ).toBeInTheDocument();
//   });

//   render(<HomePage />);

//   // ローディングメッセージの表示を確認
//   expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

//   // エラーメッセージが表示されるまで待機
//   await waitFor(() => {
//     console.log(screen.debug()); // ここでDOMを出力して確認する
//     expect(
//       screen.getByText(/取引の取得中にエラーが発生しました/i),
//     ).toBeInTheDocument();
//   });

//   // 表示されたエラーメッセージを確認
//   expect(
//     screen.getByText(/取引の取得中にエラーが発生しました/i),
//   ).toBeInTheDocument();
// });

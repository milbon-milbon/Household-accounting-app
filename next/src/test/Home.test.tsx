// src/test/home.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "../app/page";

jest.mock("swr", () => ({
  __esModule: true,
  default: () => ({
    data: [
      {
        id: 1,
        date: "2024-08-11",
        amount: 1000,
        type: "income",
        details: "Some Details",
        userId: 1,
      },
    ],
    error: null,
    mutate: jest.fn(),
  }),
}));

test("renders HomePage and displays transactions", () => {
  render(<HomePage />);

  expect(screen.getByText("家計の登録フォーム")).toBeInTheDocument();

  // 'Some Details'を含む要素を検索し、最初の要素が正しく表示されていることを確認
  const transactionElement = screen.getByText(/Some Details/);

  if (!transactionElement) {
    console.log(screen.debug()); // 追加: DOMのデバッグ情報を表示
  }

  expect(transactionElement).toBeInTheDocument();
});

test("displays error when invalid user ID is submitted", async () => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
  render(<HomePage />);

  fireEvent.change(screen.getByLabelText("日付:"), {
    target: { value: "2024-08-11" },
  });
  fireEvent.change(screen.getByLabelText("金額:"), {
    target: { value: "1000" },
  });
  fireEvent.change(screen.getByLabelText("種類:"), {
    target: { value: "income" },
  });
  fireEvent.change(screen.getByLabelText("詳細:"), {
    target: { value: "Test Income" },
  });
  fireEvent.change(screen.getByLabelText("ユーザID:"), {
    target: { value: "-1" },
  });

  fireEvent.click(screen.getByText("登録"));

  expect(window.alert).toHaveBeenCalledWith("無効なユーザーIDです");
});

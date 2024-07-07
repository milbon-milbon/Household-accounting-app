import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import HomePage from "../app/page";

beforeEach(() => {
  fetchMock.resetMocks();
});

jest.mock("swr", () => ({
  __esModule: true,
  default: (key: string, fetcher: (url: string) => Promise<any>) => {
    console.log("Mock SWR called with key:", key);
    return {
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
    };
  },
}));

test("renders HomePage and displays transactions", () => {
  render(<HomePage />);

  expect(screen.getByText("家計の登録フォーム")).toBeInTheDocument();
  const transactionElement = screen.getByText(/Some Details/);
  expect(transactionElement).toBeInTheDocument();
});

test("displays error when invalid user ID is submitted", async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ exists: false }));

  const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
  console.log("alertMock set up");

  await act(async () => {
    render(<HomePage />);
  });

  await act(async () => {
    fireEvent.change(screen.getByLabelText("日付:"), {
      target: { value: "2024-08-11" },
    });
    console.log("日付変更完了");
  });

  await act(async () => {
    fireEvent.change(screen.getByLabelText("金額:"), {
      target: { value: "1000" },
    });
    console.log("金額変更完了");
  });

  await act(async () => {
    fireEvent.change(screen.getByLabelText("種類:"), {
      target: { value: "income" },
    });
    console.log("種類変更完了");
  });

  await act(async () => {
    fireEvent.change(screen.getByLabelText("詳細:"), {
      target: { value: "Test Income" },
    });
    console.log("詳細変更完了");
  });

  await act(async () => {
    fireEvent.change(screen.getByLabelText("ユーザID:"), {
      target: { value: "-1" },
    });
    console.log("ユーザID変更完了");
  });

  await act(async () => {
    fireEvent.click(screen.getByText("登録"));
    console.log("登録ボタンクリック完了");
  });

  console.log(fetchMock.mock.calls);
  console.log("alertMock calls:", alertMock.mock.calls);

  expect(alertMock).toHaveBeenCalledWith("無効なユーザーIDです");
  alertMock.mockRestore();
});

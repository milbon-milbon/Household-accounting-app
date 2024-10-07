// app/components/TransactionSummary.tsx
"use client";
import React, { useState } from "react";
import { Transaction } from "../components/List";

interface SummaryProps {
  transactions: Transaction[];
}

const Summary: React.FC<SummaryProps> = ({ transactions }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  const summary = Array.isArray(transactions)
    ? transactions.reduce(
        (acc, transaction) => {
          const month = transaction.day.slice(0, 7);
          if (!acc[month]) acc[month] = { income: 0, expense: 0 };
          if (transaction.payment_type === "入金") {
            acc[month].income += transaction.amount;
          } else {
            acc[month].expense += transaction.amount;
          }
          return acc;
        },
        {} as { [key: string]: { income: number; expense: number } },
      )
    : {};
  const months = Object.keys(summary);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div>
      <h2>月ごとの入出金履歴</h2> {/* タイトル */}
      <div>
        <label htmlFor="month-select">月を選択:</label>
        <select id="month-select" onChange={handleMonthChange}>
          {" "}
          {/* 月を選択するためのセレクトボックス */}
          <option value="">--選択してください--</option>{" "}
          {/* デフォルトの選択肢 */}
          {months.map(
            (
              month, // months配列を使って選択肢を動的に生成
            ) => (
              <option key={month} value={month}>
                {month} {/* 年月を表示 */}
              </option>
            ),
          )}
        </select>
      </div>
      {selectedMonth &&
        summary[selectedMonth] && ( // selectedMonthが選択されている場合にのみ表示
          <div>
            <h3>{selectedMonth} の入出金履歴</h3>
            <p>入金: {summary[selectedMonth].income}円</p>
            <p>出金: {summary[selectedMonth].expense}円</p>
            <p>
              差額:{" "}
              {summary[selectedMonth].income - summary[selectedMonth].expense}円
            </p>
          </div>
        )}
    </div>
  );
};

export default Summary;

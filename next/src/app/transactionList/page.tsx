// 入出金履歴の一覧を表示

"use client";

import Link from "next/link";
import React from "react";

export interface Transaction {
  id: number;
  user_id: number;
  category_id: number;
  payment_id: number;
  member: string;
  name: string;
  payment_items: string;
  payment_type: string;
  day: string;
  amount: number;
  contents?: string;
  remarks?: string;
}

interface Props {
  transactions: Transaction[];
  onDelete: (id: number) => void; // 削除関数を受け取る
}

const List: React.FC<Props> = ({ transactions, onDelete }) => {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return <div>取引がありません</div>;
  }

  return (
    <div className="list-container">
      <h2>取引明細</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <div className="transaction-info">
              [{transaction.id}]{" "}
              {transaction.day
                ? transaction.day.substring(0, 10) // 'day' が正しいフィールドであればこれを使用
                : "日付不明"}{" "}
              - {transaction.amount}円 - {transaction.payment_type} -{" "}
              {transaction.contents || "詳細なし"}{" "}
              <Link href={`/transactions/${transaction.id}`}>
                <button className="link">詳細</button>
              </Link>
              <button
                className="button-delete"
                onClick={() => onDelete(transaction.id)}
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default List;

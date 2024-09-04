// 入出金履歴の一覧を表示

"use client";

import Link from "next/link";
import React from "react";

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  type: string;
  details: string;
  userId: number;
}

interface Props {
  transactions: Transaction[];
  onDelete: (id: number) => void; // 削除関数を受け取る
}

const List: React.FC<Props> = ({ transactions, onDelete }) => {
  if (!transactions || transactions.length === 0) {
    return <div>取引がありません</div>;
  }
  return (
    <div className="list-container">
      <h2>取引明細</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <div className="transaction-info">
              [{transaction.id}] {transaction.date.substring(0, 10)} -{" "}
              {transaction.amount}円 - {transaction.type}- {transaction.details}{" "}
              {/* detailsフィールドを表示 */}
              <Link href={`/transactions/${transaction.id}`}>
                <button className="link">詳細</button>
              </Link>
              <button
                className="button-delete"
                onClick={() => onDelete(transaction.id)}
              >
                削除
              </button>{" "}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;

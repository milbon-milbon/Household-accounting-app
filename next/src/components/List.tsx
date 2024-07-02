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
    <div>
      <h2>取引明細</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <div className="transaction-info">
              {transaction.date} - {transaction.amount}円 - {transaction.type}
            </div>
            <div className="transaction-actions">
              <Link href={`/transactions/${transaction.id}`}>
                <button className="link">詳細</button>
              </Link>
              <button onClick={() => onDelete(transaction.id)}>削除</button>{" "}
              {/* 削除ボタン */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List; // Listコンポーネントをエクスポート

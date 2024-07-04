//動的パス（/transactions/[id]）に対応するページコンポーネント。特定の取引の詳細を表示

"use client";
import React, { useEffect, useState } from "react";
import Form from "../../../components/Form"; // 相対パスに修正
import { usePathname } from "next/navigation";
import { Transaction } from "../../../types";
import Link from "next/link";

const DetailPage: React.FC = () => {
  const pathname = usePathname();
  const [transaction, setTransaction] = useState<Transaction | undefined>(
    undefined,
  );
  const [isEditing, setIsEditing] = useState(false); // 編集モードの状態を管理
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    const id = pathname?.split("/").pop();
    if (id) {
      fetch(`${apiUrl}/transactions/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setTransaction(data);
        })
        .catch((error) => {
          console.error("Error fetching transaction:", error);
        });
    }
  }, [pathname, apiUrl]); // 依存配列に apiUrl を追加

  const handleUpdate = (updatedTransaction: {
    date: string;
    amount: number;
    type: string;
    details: string;
    userId: number;
  }) => {
    if (transaction) {
      fetch(`${apiUrl}/transactions/${transaction.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTransaction),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setTransaction(data);
          setIsEditing(false); // 編集モードを終了
        })
        .catch((error) => {
          console.error("Error updating transaction:", error);
        });
    }
  };
  if (!transaction) return <div>取引が見つかりません</div>;

  return (
    <div>
      <h2>取引詳細</h2>
      {isEditing ? (
        <Form onSubmit={handleUpdate} initialValues={transaction} /> // initialValues を追加
      ) : (
        <div>
          <p>日付: {transaction.date}</p>
          <p>金額: {transaction.amount}円</p>
          <p>種類: {transaction.type}</p>
          <p>詳細: {transaction.details}</p>
          <p>ユーザ: {transaction.userId}</p>
          <button onClick={() => setIsEditing(true)}>更新</button>
        </div>
      )}
      <Link href="/">戻る</Link>
    </div>
  );
};
export default DetailPage; // DetailPageコンポーネントをエクスポート

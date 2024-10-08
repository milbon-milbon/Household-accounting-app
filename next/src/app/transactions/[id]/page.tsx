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
  const [isEditing, setIsEditing] = useState(false);
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
  }, [pathname, apiUrl]);

  const handleUpdate = (updatedTransaction: Omit<Transaction, "id">) => {
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
          setIsEditing(false);
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
        <Form
          onSubmit={handleUpdate}
          initialValues={transaction}
          setUserId={(id) => {
            // ここでユーザーIDを設定する処理を追加
            // 例: setTransaction(prev => prev ? {...prev, user_id: id} : prev);
          }}
        />
      ) : (
        <div>
          <p>日付: {transaction.day}</p>
          <p>金額: {transaction.amount}円</p>
          <p>種類: {transaction.payment_type}</p>
          <p>詳細: {transaction.contents}</p>
          <p>ユーザ: {transaction.user_id}</p>
          <button onClick={() => setIsEditing(true)}>更新</button>
        </div>
      )}
      <Link href="/">戻る</Link>
    </div>
  );
};

export default DetailPage;

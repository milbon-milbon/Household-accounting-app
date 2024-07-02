//ルートパス（/）に対応するページコンポーネントです。ホームページの内容を定義

"use client";
import React, { useState, useEffect } from "react";
import List from "../components/List";
import Summary from "../components/Summary";
import { Transaction } from "../types";
import Form from "../components/Form";

// HomePageって名前のReact Functional Componentを
const HomePage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    fetch(`${apiUrl}/transactions`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTransactions(data);
        } else {
          throw new Error(
            'Invalid response format: missing or invalid "transactions" array',
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error.message);
      });
  }, [apiUrl]);

  const handleFormSubmit = (newTransaction: {
    id: number;
    date: string;
    amount: number;
    type: string;
    details: string;
    userId: number;
  }) => {
    fetch(`${apiUrl}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTransactions([...transactions, data]);
      })
      .catch((error) => {
        console.error("Error adding transaction:", error);
      });
  };

  const handleDelete = (id: number) => {
    fetch(`${apiUrl}/transactions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setTransactions(
          transactions.filter((transaction) => transaction.id !== id),
        );
      })
      .catch((error) => {
        console.error("Error deleting transaction:", error);
      });
  };

  //レンダリング
  return (
    <div className="flex-container">
      <Form onSubmit={handleFormSubmit} />
      <List transactions={transactions} onDelete={handleDelete} />{" "}
      {/* Listコンポーネントにtransactionsの状態を渡し取引リストを表示 */}
      <Summary transactions={transactions} />{" "}
      {/* Summaryコンポーネントにtransactionsの状態を渡して、取引の要約を表示 */}
    </div>
  );
};

export default HomePage; // HomePageコンポーネントをエクスポート

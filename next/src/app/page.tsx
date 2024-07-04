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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
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
        setErrorMessage("取引の取得中にエラーが発生しました");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiUrl]);

  const handleFormSubmit = (newTransaction: {
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
  if (loading) {
    return <div>Loading...</div>;
  }

  //レンダリング
  return (
    <div className="flex-container">
      {errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <>
          <Form onSubmit={handleFormSubmit} />
          <List transactions={transactions} onDelete={handleDelete} />{" "}
          <Summary transactions={transactions} />{" "}
        </>
      )}
    </div>
  );
};

export default HomePage;

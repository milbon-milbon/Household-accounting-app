"use client";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import List from "../components/List";
import Summary from "../components/Summary";
import { Transaction } from "../types";
import Form from "../components/Form";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const HomePage: React.FC = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const {
    data: transactions,
    error,
    mutate,
  } = useSWR<Transaction[]>(`${apiUrl}/transactions`, fetcher);

  const [userId, setUserId] = useState<number | null>(null);
  const [userExists, setUserExists] = useState<boolean | null>(null);

  const checkUserExists = async (id: number) => {
    const response = await fetch(`${apiUrl}/user-exists/${id}`);
    const result = await response.json();
    setUserExists(result.exists);
  };

  const handleFormSubmit = (newTransaction: Transaction) => {
    if (userExists === false) {
      alert("無効なユーザーIDです");
      return;
    }

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
        mutate([...transactions!, data], false); // ローカルデータを更新して再フェッチをトリガー
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
        mutate(
          transactions!.filter((transaction) => transaction.id !== id),
          false,
        ); // ローカルデータを更新して再フェッチをトリガー
      })
      .catch((error) => {
        console.error("Error deleting transaction:", error);
      });
  };

  useEffect(() => {
    if (userId !== null) {
      checkUserExists(userId);
    }
  }, [userId]);

  if (error) {
    return <div>取引の取得中にエラーが発生しました</div>;
  }
  if (!transactions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-container">
      <Form onSubmit={handleFormSubmit} />
      <List transactions={transactions} onDelete={handleDelete} />
      <Summary transactions={transactions} />
    </div>
  );
};

export default HomePage;

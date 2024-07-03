"use client";
import React, { useState, useEffect } from "react";

interface FormProps {
  onSubmit: (transaction: {
    date: string;
    amount: number;
    type: string;
    details: string;
    userId: number;
  }) => void;
  initialValues?: {
    id: number;
    date: string;
    amount: number;
    type: string;
    details: string;
    userId: number;
  };
}

const Form: React.FC<FormProps> = ({ onSubmit, initialValues }) => {
  const [date, setDate] = useState(initialValues?.date || "");
  const [amount, setAmount] = useState(initialValues?.amount.toString() || "");
  const [type, setType] = useState(initialValues?.type || "");
  const [details, setDetails] = useState(initialValues?.details || "");
  const [userId, setUserId] = useState(initialValues?.userId.toString() || "");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // 送信時にエラーをクリア
    setIsSubmitting(true); // 送信中に設定

    const transaction = {
      date,
      amount: parseFloat(amount),
      type,
      details,
      userId: parseInt(userId),
    };

    try {
      onSubmit(transaction);
      setDate("");
      setAmount("");
      setType("");
      setDetails("");
      setUserId("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false); // 送信完了後に送信状態をリセット
    }
  };
  useEffect(() => {
    if (initialValues) {
      setDate(initialValues.date);
      setAmount(initialValues.amount.toString());
      setType(initialValues.type);
      setDetails(initialValues.details);
      setUserId(initialValues.userId.toString());
    }
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>日付:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>金額:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>種類:</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>
      <div>
        <label>詳細:</label>
        <input
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>
      <div>
        <label>ユーザID:</label>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}{" "}
      {/* エラーメッセージを表示 */}
      <button type="submit" disabled={isSubmitting}>
        登録
      </button>{" "}
      {/* 送信中はボタンを無効化 */}
    </form>
  );
};

export default Form;

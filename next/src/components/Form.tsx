"use client";
import React, { useState, useEffect } from "react";

// 環境変数からAPIのURLを取得し、必要に応じてhttpsをhttpに置き換え
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface FormProps {
  onSubmit: (transaction: {
    id: number; // ここに `id` プロパティを追加
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
    e.preventDefault(); // デフォルトのフォーム送信動作を抑制

    console.log("handleSubmit called");

    if (isSubmitting) {
      console.log("Already submitting");
      return;
    }

    setError(null); // 送信時にエラーをクリア
    setIsSubmitting(true); // 送信中に設定

    const transaction = {
      id: Math.random(), // ここで id を生成
      date,
      amount: parseFloat(amount),
      type,
      details,
      userId: parseInt(userId),
    };

    console.log("Request successful");
    onSubmit(transaction);
    setDate("");
    setAmount("");
    setType("");
    setDetails("");
    setUserId("");
    setIsSubmitting(false); // 送信完了後に送信状態をリセット
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
      <div>家計の登録フォーム</div>
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
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button
        type="submit"
        className="rounded-button"
        disabled={isSubmitting}
        onClick={() => console.log("Submit button clicked")} // ここにログを追加
        style={{ width: "200px" }}
      >
        登録
      </button>
    </form>
  );
};

export default Form;

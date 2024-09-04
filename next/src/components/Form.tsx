import React, { useState, useEffect } from "react";

// 環境変数からAPIのURLを取得し、必要に応じてhttpsをhttpに置き換え
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface FormProps {
  onSubmit: (transaction: {
    id: number;
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
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
}

const Form: React.FC<FormProps> = ({ onSubmit, initialValues, setUserId }) => {
  const [date, setDate] = useState(initialValues?.date || "");
  const [amount, setAmount] = useState(initialValues?.amount.toString() || "");
  const [type, setType] = useState(initialValues?.type || "");
  const [details, setDetails] = useState(initialValues?.details || "");
  const [userIdInput, setUserIdInput] = useState(
    initialValues?.userId.toString() || "",
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUserValid, setIsUserValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (initialValues) {
      setDate(initialValues.date);
      setAmount(initialValues.amount.toString());
      setType(initialValues.type);
      setDetails(initialValues.details);
      setUserIdInput(initialValues.userId.toString());
    }
  }, [initialValues]);

  useEffect(() => {
    const checkUserExists = async () => {
      if (userIdInput) {
        console.log("Checking user with ID:", userIdInput); // 追加
        const response = await fetch(
          `${apiUrl}/users/user-exists/${userIdInput}`,
        );
        const result = await response.json();
        console.log("checkUserExists result:", result); // 追加

        setIsUserValid(result.exists);
        setUserId(result.exists ? parseInt(userIdInput, 10) : null);
      } else {
        setIsUserValid(null);
        setUserId(null);
      }
    };
    checkUserExists();
  }, [userIdInput, setUserId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting || isUserValid === false) {
      setError("無効なユーザーIDです");
      window.alert("無効なユーザーIDです");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const transaction = {
      id: Math.floor(Math.random() * 1000000),
      date,
      amount: parseFloat(amount),
      type,
      details,
      userId: parseInt(userIdInput, 10),
    };

    try {
      await onSubmit(transaction);
      setDate("");
      setAmount("");
      setType("");
      setDetails("");
      setUserIdInput("");
    } catch (error) {
      setError("取引の追加中にエラーが発生しました");
      console.error("Error adding transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>家計の登録フォーム</div>
      <div>
        <label htmlFor="date">日付:</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="amount">金額:</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="type">種類:</label>
        <input
          id="type"
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="details">詳細:</label>
        <input
          id="details"
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="userId">ユーザID:</label>
        <input
          id="userId"
          type="number"
          value={userIdInput}
          onChange={(e) => setUserIdInput(e.target.value)}
          required
        />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button
        type="submit"
        className="rounded-button"
        disabled={isSubmitting || isUserValid === false}
        style={{ width: "200px" }}
      >
        登録
      </button>
    </form>
  );
};

export default Form;

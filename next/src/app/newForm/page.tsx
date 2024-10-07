import React, { useState, useEffect } from "react";
import { Transaction } from "../types"; // Transactionタイプをインポート

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface FormProps {
  onSubmit: (transaction: Omit<Transaction, "id">) => void;
  initialValues?: Transaction;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
}

const Form: React.FC<FormProps> = ({ onSubmit, initialValues, setUserId }) => {
  const [day, setDay] = useState(initialValues?.day || "");
  const [amount, setAmount] = useState(initialValues?.amount.toString() || "");
  const [payment_type, setPaymentType] = useState(
    initialValues?.payment_type || "",
  );
  const [contents, setContents] = useState(initialValues?.contents || "");
  const [userIdInput, setUserIdInput] = useState(
    initialValues?.user_id.toString() || "",
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUserValid, setIsUserValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (initialValues) {
      setDay(initialValues.day);
      setAmount(initialValues.amount.toString());
      setPaymentType(initialValues.payment_type);
      setContents(initialValues.contents || "");
      setUserIdInput(initialValues.user_id.toString());
    }
  }, [initialValues]);

  useEffect(() => {
    const checkUserExists = async () => {
      if (userIdInput) {
        console.log("Checking user with ID:", userIdInput);
        const response = await fetch(
          `${apiUrl}/users/user-exists/${userIdInput}`,
        );
        const result = await response.json();
        console.log("checkUserExists result:", result);

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

    const transaction: Omit<Transaction, "id"> = {
      day,
      amount: parseFloat(amount),
      payment_type,
      contents,
      user_id: parseInt(userIdInput, 10),
      category_id: parseInt(categoryIdInput, 10), // category_idの追加
      payment_id: parseInt(paymentIdInput, 10), // payment_idの追加
      member, // memberの追加
      name, // nameの追加
      payment_items, // payment_itemsの追加
    };
    try {
      await onSubmit(transaction);
      setDay("");
      setAmount("");
      setPaymentType("");
      setContents("");
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
        <label htmlFor="day">日付:</label>
        <input
          id="day"
          type="date"
          value={day}
          onChange={(e) => setDay(e.target.value)}
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
        <label htmlFor="payment_type">種類:</label>
        <input
          id="payment_type"
          type="text"
          value={payment_type}
          onChange={(e) => setPaymentType(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="contents">詳細:</label>
        <input
          id="contents"
          type="text"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="user_id">ユーザID:</label>
        <input
          id="user_id"
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

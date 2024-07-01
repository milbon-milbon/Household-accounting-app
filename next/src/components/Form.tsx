"use client";
import React, { useState } from 'react';

interface FormProps {
  onSubmit: (transaction: { date: string; amount: number; type: string; details: string; user_id: number }) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [details, setDetails] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState<string | null>(null); // エラー状態を追加 
  const [isSubmitting, setIsSubmitting] = useState(false); // 送信状態を追加

  // 環境変数からAPIのURLを取得し、必要に応じてhttpsをhttpに置き換え
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // 送信時にエラーをクリア
    setIsSubmitting(true); // 送信中に設定

    const transaction = { date, amount: parseFloat(amount), type, details, user_id: parseInt(userId) };

    try {
      const response = await fetch(`${apiUrl}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Unknown error occurred');
      }

      onSubmit(transaction);
      setDate('');
      setAmount('');
      setType('');
      setDetails('');
      setUserId('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false); // 送信完了後に送信状態をリセット
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>日付:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <label>金額:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <div>
        <label>種類:</label>
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
      </div>
      <div>
        <label>詳細:</label>
        <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} />
      </div>
      <div>
        <label>ユーザID:</label>
        <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} required />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* エラーメッセージを表示 */}
      <button type="submit" disabled={isSubmitting}>登録</button> {/* 送信中はボタンを無効化 */}
    </form>
  );
};

export default Form;

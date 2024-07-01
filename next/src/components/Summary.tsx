// app/components/TransactionSummary.tsx
"use client";
import React, { useState } from 'react';
import { Transaction } from '../types'; // '../types' モジュールから 'Transaction' 型をインポー

interface SummaryProps { // TransactionSummaryコンポーネントのプロパティの型を定義受け取る型を定義。
  transactions: Transaction[]; // transactionsプロパティはTransaction型の配列
}

const Summary: React.FC<SummaryProps> = ({ transactions }) => { // TransactionSummaryという名前のReact Functional Componentを定義
  const [selectedMonth, setSelectedMonth] = useState<string>(''); // selectedMonthという状態とそれを更新するための関数setSelectedMonthをuseStateフックを使って宣言。初期値は空の文字列

  const summary = transactions.reduce((acc, transaction) => { // transactions配列を使って月ごとの入出金の集計 
    const month = transaction.date.slice(0, 7); // 取引の日付から年月を抽出
    if (!acc[month]) acc[month] = { income: 0, expense: 0 }; // まだ月が存在しない場合、初期値を設定。
    if (transaction.type === '入金') { // 取引の種類が入金の場合
      acc[month].income += transaction.amount; // その月の入金額に取引金額を加算。
    } else { // 取引の種類が出金の場合
      acc[month].expense += transaction.amount; // その月の出金額に取引金額を加算
    }
    return acc; // 集計結果を返
  }, {} as { [key: string]: { income: number; expense: number } }); // 初期値は空のオブジェクトで、キーは文字列、値は入金と出金を含むオブジェクト

  const months = Object.keys(summary); // 集計結果のキー（年月）を配列として取得

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => { // 月の選択が変更された時のイベントハンドラー
    setSelectedMonth(event.target.value); // selectedMonthの状態を更新
  };

  return (
    <div>
      <h2>月ごとの入出金履歴</h2> {/* タイトル */}
      <div>
        <label htmlFor="month-select">月を選択:</label> {/* 月を選択するためのラベル */}
        <select id="month-select" onChange={handleMonthChange}> {/* 月を選択するためのセレクトボックス */}
          <option value="">--選択してください--</option> {/* デフォルトの選択肢 */}
          {months.map(month => ( // months配列を使って選択肢を動的に生成
            <option key={month} value={month}>
              {month} {/* 年月を表示 */}
            </option>
          ))}
        </select>
      </div>
      {selectedMonth && summary[selectedMonth] && ( // selectedMonthが選択されている場合にのみ表示
        <div>
          <h3>{selectedMonth} の入出金履歴</h3> {/* 選択された月のタイトル */}
          <p>入金: {summary[selectedMonth].income}円</p> {/* 入金額 */}
          <p>出金: {summary[selectedMonth].expense}円</p> {/* 出金額 */}
          <p>差額: {summary[selectedMonth].income - summary[selectedMonth].expense}円</p> {/* 入金と出金の差額 */}
        </div>
      )}
    </div>
  );
};

export default Summary; // TransactionSummaryコンポーネントをエクスポート
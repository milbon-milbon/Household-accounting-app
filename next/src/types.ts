// TypeScriptの型定義を格納するファイル。データモデルやインターフェースの型定義を記述
export interface Transaction {
  id: number;
  user_id: number;
  category_id: number;
  payment_id: number;
  member: string;
  name: string;
  payment_items: string;
  payment_type: string;
  day: string;
  amount: number;
  contents?: string;
  remarks?: string;
}

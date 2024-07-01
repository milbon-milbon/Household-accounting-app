// TypeScriptの型定義を格納するファイル。データモデルやインターフェースの型定義を記述 
export interface Transaction {
  id: number;
  date: string;
  amount: number;
  type: string;
  details: string;
  userId: number;
}


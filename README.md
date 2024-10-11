# 💳家計簿アプリ
簡易版家計簿アプリです。
取引データの管理やサマリー機能、そのほかユーザーごとの収支の管理を行います。
学習初期１か月の状態から、versionupのため現在作業中です。

## 各種ドキュメント

### >[docs](https://github.com/milbon-milbon/Household-accounting-app/tree/main/docs)
- [基本設計](https://github.com/milbon-milbon/Household-accounting-app/tree/main/docs/BasicDesign)
  - [テーブル定義書](https://github.com/milbon-milbon/Household-accounting-app/blob/main/docs/BasicDesign/dbDefinition.md)
  - [ER図](https://github.com/milbon-milbon/Household-accounting-app/tree/main/docs/BasicDesign/er.pu)
- [詳細設計](https://github.com/milbon-milbon/Household-accounting-app/tree/main/docs/DetailedDesign)
  - [システム概要(主要機能、アーキテクチャ図、使用技術)](https://github.com/milbon-milbon/Household-accounting-app/tree/main/docs/DetailedDesign/SystemOverview.md)
  - [画面一覧と画面遷移図](https://github.com/milbon-milbon/Household-accounting-app/tree/main/docs/DetailedDesign/screenTransitionDiagram.jpg)
  - [API設計書](https://github.com/milbon-milbon/Household-accounting-app/tree/main/docs/DetailedDesign/apiDesign.md)
  - [主要機能のテストシナリオ](https://github.com/milbon-milbon/Household-accounting-app/tree/main/docs/DetailedDesign/e2eScenario.md)

## セットアップ手順

このプロジェクトをローカル環境で実行するためには、以下の手順に従ってください。

### 1. リポジトリのクローン

```bash
git clone https://github.com/milbon-milbon/Household-accounting-app.git
cd Household-accounting-app
```

### 2. 必要なパッケージのインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env`ファイルをプロジェクトルートに作成し、必要な環境変数を設定します。以下は環境変数の例です。

```env
DATABASE_URL=mysql://user:password@localhost:3306/mydatabase
```

### 4. データベースの設定

以下のコマンドで、データベースのマイグレーションを実行し、初期データを挿入します。

```bash
npx prisma migrate dev --name init
npm run seed
```

### 5. アプリケーションの実行

ローカル環境でアプリケーションを実行するには、以下のコマンドを使用します。

```bash
npm run dev
```

フロントエンドは `http://localhost:3000` でアクセス可能です。バックエンドAPIは `http://localhost:4000` で動作します。

## テスト

### コードカバレッジ
カバレッジの結果は `coverage/index.html` ファイルで確認できます。

### End-to-End テスト

Playwright を使用して、エンドツーエンドテストが実行されています。以下のコマンドでテストを実行できます。

```bash
npm run test:e2e
```

---

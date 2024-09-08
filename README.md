# 💳家計簿アプリ

このプロジェクトは、学習を初めて1か月頃に作成した[家計簿アプリ](https://github.com/milbon-milbon/Household-accounting-app.git) に関連する個人開発ウェブアプリケーションです。<br>
取引データの管理やユーザー管理を行います。バックエンドにはNode.jsとExpress、フロントエンドにはReactが使用されています。

## プロジェクト構成

### 使用技術

- **バックエンド**: Node.js, Express
- **フロントエンド**: React, Next.js
- **データベース**: MySQL (Prisma ORM)
- **テスト**: Jest, Supertest, End-to-End テスト (E2E) には Playwright を使用

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

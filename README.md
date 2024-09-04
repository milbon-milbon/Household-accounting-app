こちらが、マークダウン形式に変換した内容です。

---

# プロジェクト名

このプロジェクトは、学習用に作成した[家計簿アプリ](https://github.com/milbon-milbon/Household-accounting-app.git) に関連する個人開発ウェブアプリケーションです。<br>
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

このプロジェクトでは、[Istanbul](https://istanbul.js.org/) を使用してコードカバレッジレポートが生成されます。カバレッジレポートを確認するには、以下のコマンドを実行してください。

```bash
npm run test:coverage
```

カバレッジの結果は `coverage/index.html` ファイルで確認できます。

#### カバレッジレポートのサンプル

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Code coverage report for All files</title>
    ...
  </head>
  <body>
    <div class="wrapper">
      <h1>All files</h1>
      <div class="clearfix">
        <div>Statements: 57.36%</div>
        <div>Branches: 45.45%</div>
        <div>Functions: 45%</div>
        <div>Lines: 58.28%</div>
      </div>
      ...
    </div>
  </body>
</html>
```

### End-to-End テスト

Playwright を使用して、エンドツーエンドテストが実行されています。以下のコマンドでテストを実行できます。

```bash
npm run test:e2e
```

---

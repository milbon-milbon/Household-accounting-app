# テーブル定義書

## 1. Users テーブル

| カラム名 | データ型 | 制約 | 説明 |
|----------|----------|------|------|
| id | integer | PRIMARY KEY | ユーザーの一意識別子 |
| member | varchar(50) | NOT NULL | メンバー種別 |
| name | varchar(100) | NOT NULL | ユーザー名 |
| mail | varchar(100) | UNIQUE, NOT NULL | メールアドレス |
| password_hash | varchar(255) | NOT NULL | パスワードハッシュ |
| created_at | timestamp | DEFAULT CURRENT_TIMESTAMP | 作成日時 |
| updated_at | timestamp | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新日時 |

## 2. income_and_expenditure テーブル

| カラム名 | データ型 | 制約 | 説明 |
|----------|----------|------|------|
| id | integer | PRIMARY KEY | 収支の一意識別子 |
| category_id | integer | FOREIGN KEY (category.id) ON DELETE RESTRICT ON UPDATE CASCADE | カテゴリーID |
| user_id | integer | FOREIGN KEY (Users.id) ON DELETE CASCADE ON UPDATE CASCADE | ユーザーID |
| transaction_id | integer | FOREIGN KEY (transaction.id) ON DELETE CASCADE ON UPDATE CASCADE | 取引ID |
| payment_type | varchar(20) | NOT NULL | 支払い種類 |
| day | date | NOT NULL | 取引日 |
| amount | decimal(10,2) | NOT NULL | 金額 |

## 3. category テーブル

| カラム名 | データ型 | 制約 | 説明 |
|----------|----------|------|------|
| id | integer | PRIMARY KEY | カテゴリーの一意識別子 |
| payment_id | integer | FOREIGN KEY (payment.id) ON DELETE RESTRICT ON UPDATE CASCADE | 支払いID |
| contents | varchar(100) | NOT NULL | カテゴリー内容 |

## 4. payment テーブル

| カラム名 | データ型 | 制約 | 説明 |
|----------|----------|------|------|
| id | integer | PRIMARY KEY | 支払いの一意識別子 |
| user_id | integer | FOREIGN KEY (Users.id) ON DELETE CASCADE ON UPDATE CASCADE | ユーザーID |
| payment_items | varchar(100) | NOT NULL | 支払い項目 |

## 5. transaction テーブル

| カラム名 | データ型 | 制約 | 説明 |
|----------|----------|------|------|
| id | integer | PRIMARY KEY | 取引の一意識別子 |
| user_id | integer | FOREIGN KEY (Users.id) ON DELETE CASCADE ON UPDATE CASCADE | ユーザーID |
| category_id | integer | FOREIGN KEY (category.id) ON DELETE RESTRICT ON UPDATE CASCADE | カテゴリーID |
| payment_id | integer | FOREIGN KEY (payment.id) ON DELETE RESTRICT ON UPDATE CASCADE | 支払いID |
| member | varchar(50) | NOT NULL | メンバー情報 |
| name | varchar(100) | NOT NULL | 取引名 |
| payment_items | varchar(100) | NOT NULL | 支払い項目 |
| payment_type | varchar(20) | NOT NULL | 支払い種類 |
| day | date | NOT NULL | 取引日 |
| amount | decimal(10,2) | NOT NULL | 金額 |
| contents | text | | 取引内容 |
| remarks | text | | 備考 |
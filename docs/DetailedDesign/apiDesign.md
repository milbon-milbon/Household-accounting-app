## API 設計書
### _リソースの一覧_
* Users
* Transactions
* Categorises
* Account

### _エンドポイント一覧_
#### 1. Users
- GET /users - 全ユーザーの取得
- GET /users/{id} - 特定ユーザーの取得
- POST /users - 新しいユーザーの作成
- PUT /users/{id} - 特定ユーザーの更新
- DELETE /users/{id} - 特定ユーザーの削除
#### 2. Transactions
- GET /transactions -  全取引の取得
- GET /transactions/{id} - 全取引の取得
- POST /transactions - 全取引の作成
- PUT transactions/{id} - 特定取引の更新
- DELETE /transactions/{id} - 特定取引の削除
#### 3. Categorises
- GET /categories - 全カテゴリの取得
- GET /categories/{id} - 特定カテゴリの取得
- POST /categories - 新しいカテゴリの作成
- PUT /categories/{id} - 特定カテゴリの更新
- DELETE /categories/{id} - 特定カテゴリの削除
#### 4. Account
- GET /account - 全口座の取得
- GET /account/{id} - 特定口座の取得
- POST /account - 新しい口座の作成
- PUT /account/{id} - 特定口座の更新
- DELETE /account/{id} - 特定口座の削除
### _HTTP メソッドごとの設計_
### 1. Users
* GET /users
  * 説明: 全ユーザーの取得
  * リクエスト
    ```
    GET     /users
    ```
  * レスポンス
    ```
    {
      "users": [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com"
        },
        {
            "id": 2,
            "name": "Jane Doe",
            "email": "jane@example.com"
        }
        ]
    }
    ```
* GET /users/{id}
  * 説明: 特定ユーザーの取得
  * リクエスト
    ```
    GET     /users/1
    ```
  * レスポンス
    ```
        {
          "id": 1,
          "name": "John Doe",
          "email": "john@example.com"
          }
  
    ```
* POST /users
  * 説明: 新しいユーザーの作成
  * リクエスト
    ```
    POST  /users
    Content-Type: application/json

     {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "securepassword"
     }
    ```
  * レスポンス
    ```
    {
      "id": 3,
      "name": "John Doe",
      "email": "john@example.com"
    }
    
    ```
* PUT /users/{id}
  * 説明: 特定ユーザーの更新
  * リクエスト
    ```
    PUT  /users/{id}
    Content-Type: application/json
    {
        "name": "John Doe Updated",
        "email": "john.updated@example.com"
    }

    ```
  * レスポンス
    ```
    {
      "id": 1,
      "name": "John Doe Updated",
      "email": "john.updated@example.com"
    }
    
    ```
* DELETE /users/{id}
  * 説明: 特定ユーザーの削除
  * リクエスト
    ```
    DELETE  /users/{id}
    ```
  * レスポンス
    ```
    {
      "message": "User deleted successfully."
    }
    
    ```
### 2. transactions
* GET /transaction
  * 説明: 全取引の取得
  * リクエスト
    ```
    GET     /transaction
    ```
  * レスポンス
    ```
    {
      "tranzactions"[
        {
          "id": 1,
          "user_id": 1,
          "amount": 100.00,
          "category_id": 1,
          "account_id": 1,
          "date": "2024-06-01",
          "description": "Grocery shopping"
        },
        {
          "id": 2,
          "user_id": 1,
          "amount": 50.00,
          "category_id": 2,
          "account_id": 1,
          "date": "2024-06-02",
          "description": "Restaurant"
        }
        ]
    }
    ```
* GET /transaction/{id}
  * 説明: 特定取引の取得
  * リクエスト
    ```
    GET     /transaction/{id}
    ```
  * レスポンス
    ```
    {
      "id": 1,
      "user_id": 1,
      "amount": 100.00,
      "category_id": 1,
      "account_id": 1,
      "date": "2024-06-01",
      "description": "Grocery shopping"
    }
    ```
* POST /transaction
  * 説明: 新しい取引の作成
  * リクエスト
    ```
    POST  /transaction
    Content-Type: application/json
    {
    "user_id": 1,
    "amount": 100.00,
    "category_id": 1,
    "account_id": 1,
    "date": "2024-06-01",
    "description": "Grocery shopping"
    }
    ```
  * レスポンス
    ```
     {
      "id": 3,
      "user_id": 1,
      "amount": 100.00,
      "category_id": 1,
      "account_id": 1,
      "date": "2024-06-01",
      "description": "Grocery shopping"
    }
    ```
* PUT /transaction/{id}
  * 説明: 特定取引の更新
  * リクエスト
    ```
    PUT  /transaction/{id}
    Content-Type: application/json
     {
      "amount": 120.00,
      "category_id": 1,
      "account_id": 1,
      "date": "2024-06-02",
      "description": "Updated grocery shopping"
    }
    ```
  * レスポンス
    ```
    {
      "id": 1,
      "user_id": 1,
      "amount": 120.00,
      "category_id": 1,
      "account_id": 1,
      "date": "2024-06-02",
      "description": "Updated grocery shopping"
    }
    ```
* DELETE /transaction/{id}
  * 説明: 特定ユーザーの削除
  * リクエスト
    ```
    DELETE  /transaction/{id}
    ```
  * レスポンス
    ```
    {
      "message": "TTransactionsr deleted successfully."
    }
    ```
### 3. categorie
* GET /categorie
  * 説明: 全カテゴリの取得
  * リクエスト
    ```
    GET     /categorie
    ```
  * レスポンス
    ```
    {
      "categories"[
        {
          "id": 1,
          "name": "Groceries"
        },
        {
          "id": 2,
          "name": "Dining Out"
        }
        ]
    }
    ```
* GET /categorie/{id}
  * 説明: カテゴリidの取得
  * リクエスト
    ```
    GET     /categories/{id}
    ```
  * レスポンス
    ```
    {
    "id": 1,
    "name": "Groceries"
    }
    
    ```
* POST /categorie
  * 説明: 新しいカテゴリの作成
  * リクエスト
    ```
    POST  /categorie
    Content-Type: application/json
    {
      "name": "Entertainment"
    }
    ```
  * レスポンス
    ```
    {
      "id": 3,
      "name": "Entertainment"
    }
    ```
* PUT /categorie/{id}
  * 説明: 特定カテゴリの更新
  * リクエスト
    ```
    PUT  /categorie/{id}
    Content-Type: application/json
    {
      "name": "Updated Category Name"
    }
    ```
  * レスポンス
    ```
    {
      "id": 1,
      s"name": "Updated Category Name"
    }
    ```
* DELETE /categorie/{id}
  * 説明: 特定ユーザーの削除
  * リクエスト
    ```
    DELETE  /categorie/{id}
    ```
  * レスポンス
    ```
    {
     "message": "Category deleted successfully."
    }
    ```
### 4. account
* GET /account
  * 説明: 全口座の取得
  * リクエスト
    ```
    GET     /categories
    ```
  * レスポンス
    ```
    {
      "categories"[
        {
          "id": 1,
          "name": "Checking Account",
          "balance": 1500.00
        },
        {
          "id": 2,
          "name": "Savings Account",
          "balance": 5000.00
        }
        ]
    }
    ```
* GET /account/{id}
  * 説明: カテゴリidの取得
  * リクエスト
    ```
    GET     /account/{id}
    ```
  * レスポンス
    ```
    {
      "id": 1,
      "name": "Checking Account",
      "balance": 1500.00
    }
    ```
* POST /account
  * 説明: 新しい口座の作成
  * リクエスト
    ```
    POST  /account
    Content-Type: application/json
    {
      "name": "Investment Account",
      "balance": 10000.00
    }
    ```
  * レスポンス
    ```
    {
      "id": 3,
      "name": "Investment Account",
      "balance": 10000.00
    }
    ```
* PUT /account/{id}
  * 説明: 特定口座の更新
  * リクエスト
    ```
    PUT  /account/{id}
    Content-Type: application/json
    {
      "name": "Updated Account Name",
      "balance": 2000.00
    }
    ```
  * レスポンス
    ```
    {
      "id": 1,
      "name": "Updated Account Name",
      "balance": 2000.00
    }
    ```
* DELETE /account/{id}
  * 説明:特定口座の削除
  * リクエスト
    ```
    DELETE  /account/{id}
    ```
  * レスポンス
    ```
    {
     "message": "Account deleted successfully."
    }
    ```
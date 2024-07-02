import "../styles/globals.css"; // グローバルスタイルのインポート
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="ja">
      <head>
        <title>家計簿アプリ</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <header className="navbar">
          <div className="container">
            <h1>家計簿アプリ</h1>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 家計簿アプリ</p>
          </div>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;

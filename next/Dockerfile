# Node.js lts image
FROM node:lts

# ワーキングディレクトリを指定
WORKDIR /usr/src/app

# 同一ディレクトリ内のファイルを全てコピー 
COPY package*.json ./

# パッケージをインストール (強制オプションを追加)
RUN npm install --legacy-peer-deps

# アプリケーションのソースコードをコピー
COPY src/ ./src

# 3000番ポートでリッスン
EXPOSE 3000

# React の起動
CMD ["npm", "run", "dev"]
FROM node:lts

WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# プロジェクトファイルをコピー（prismaフォルダを含む）
COPY . .

# bcryptをbcryptjsに置き換え
RUN npm uninstall bcrypt && npm install bcryptjs
RUN npm install --save-dev @types/bcryptjs

# Prismaスキーマの場所を明示的に指定してPrismaクライアントを生成
RUN npx prisma generate --schema=./prisma/schema.prisma

# ポートを公開
EXPOSE 4000 9229

# 開発モードで実行
CMD ["npm", "run", "dev"]
FROM node:lts

WORKDIR /usr/src/app

COPY . .

# package.jsonとpackage-lock.jsonをコピーして依存関係をインストール 
COPY package*.json ./
# 依存関係をインストール
# RUN npm install --legacy-peer-deps


EXPOSE 4000
EXPOSE 9229


CMD "npm" "run" "dev" "start:debug" 
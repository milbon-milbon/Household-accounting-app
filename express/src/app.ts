import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";

import userRouter from "./router/user";
import TransactionRouter from "./router/transaction";
import { invalidJsonHandler } from "./middlewares/validation";
import logger from "./context/logger";

const app = express();
const port = 4000;
const prisma = new PrismaClient();

// morgan のログを winston を経由して出力する
// combined フォーマットで出力し、ログレベルは info に設定
app.use(
  morgan("combined", {
    stream: {
      write(message) {
        logger.info(message.trim());
      },
    },
  }),
);

// CORSミドルウェアを使用
app.use(cors());

// ミドルウェアを追加
app.use(express.json(), invalidJsonHandler);

app.use((req: Request, _res: Response, next: NextFunction) => {
  logger.debug(`Received request: ${req.method} ${req.url}`);
  next();
});

app.use("/users", userRouter);
app.use("/transactions", TransactionRouter);

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

// エラーハンドリングミドルウェアを追加
app.use((err: Error, _req: Request, res: Response) => {
  logger.error(err.stack || err.message);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  logger.debug(`Server running on http://localhost:${port}`);
});

//Prismaクライアントのシャットダウン処理を追加
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});

export default app;

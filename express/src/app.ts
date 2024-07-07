import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";

import userRouter from "./router/user";
import TransactionRouter from "./router/transaction";
import { invalidJsonHandler } from "./middlewares/validation";
import logger from "./context/logger";

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 4000;

// morgan のログを winston を経由して出力する
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

app.get("/favicon.ico", (_req, res) => res.status(204));

// エラーハンドリングミドルウェアを追加
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  logger.error((err as Error).stack || (err as Error).message);
  res
    .status(500)
    .json({ error: "Internal Server Error", details: (err as Error).message });
});

//Prismaクライアントのシャットダウン処理を追加
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    logger.debug(`Server running on http://localhost:${port}`);
  });
}

app.get("/", (_req, res) => {
  res.send("Hello World!");
});
export default app;

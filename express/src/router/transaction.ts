// transaction.ts
import { Router, Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import {
  transactionValidationRules,
  validate,
} from "../middlewares/validation";

const transactionRouter = Router();
const prisma = new PrismaClient();

// 全取引の取得
transactionRouter.get("/", async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany();
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", (error as Error).message);
    res.status(500).json({
      error: "取引の取得に失敗しました。",
      details: (error as Error).message,
    });
  }
});

// 特定取引の取得
transactionRouter.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send("無効なIDです。");
  }

  try {
    const transaction = await prisma.transaction.findUnique({ where: { id } });
    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).send("取引が見つかりません。");
    }
  } catch (error: unknown) {
    console.error("Error fetching transaction:", (error as Error).message);
    res.status(500).json({
      error: "取引の取得に失敗しました。",
      details: (error as Error).message,
    });
  }
});

// 新しい取引の作成
transactionRouter.post(
  "/",
  transactionValidationRules("POST"),
  validate,
  async (req: Request, res: Response) => {
    const { date, amount, type, details, userId } = req.body;
    try {
      const newTransaction = await prisma.transaction.create({
        data: {
          date: new Date(date).toISOString(),
          amount,
          type,
          details,
          User: { connect: { id: userId } },
        },
      });
      res.status(201).json(newTransaction);
    } catch (error) {
      console.error("Error creating transaction:", (error as Error).message);
      res.status(500).json({
        error: "取引の作成に失敗しました。IDを確認してください",
        details: (error as Error).message,
      });
    }
  },
);

// 特定の取引の更新
transactionRouter.put(
  "/:id",
  transactionValidationRules("PUT"),
  validate,
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { date, amount, type, details, userId } = req.body;
    try {
      if (isNaN(id)) {
        return res.status(400).send("無効なIDです。");
      }

      const updatedTransaction = await prisma.transaction.update({
        where: { id },
        data: {
          date: new Date(date).toISOString(),
          amount,
          type,
          details,
          User: { connect: { id: userId } },
        },
      });
      res.json(updatedTransaction);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return res.status(404).send("取引が見つかりません。");
      }
      console.error("Error updating transaction:", (error as Error).message);
      res.status(500).json({
        error: "取引の更新に失敗しました。IDを確認してください",
        details: (error as Error).message,
      });
    }
  },
);

// 特定の取引の削除
transactionRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    if (isNaN(id)) {
      return res.status(400).send("無効なIDです。");
    }

    await prisma.transaction.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).send("取引が見つかりません。");
    }

    res.status(500).json({
      error: "取引の削除に失敗しました。",
      details: (error as Error).message,
    });
  }
});

export default transactionRouter;

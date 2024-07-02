// transaction.ts
import { Router, Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { transactionValidationRules, validate } from '../middlewares/validation';

const transactionRouter = Router();
const prisma = new PrismaClient();

// 全取引の取得 
transactionRouter.get('/', async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany();
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', (error as Error).message);
    res.status(500).json({ error: '取引の取得に失敗しました。', details: (error as Error).message });
  }
});

// 特定取引の取得
transactionRouter.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const transaction = await prisma.transaction.findUnique({ where: { id } });
    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).send('取引が見つかりません。');
    }
  } catch (error: unknown) {
    console.error('Error fetching transaction:', (error as Error).message);
    res.status(500).json({ error: '取引の取得に失敗しました。', details: (error as Error).message });
  }
});

// 新しい取引の作成
transactionRouter.post('/', transactionValidationRules(), validate, async (req: Request, res: Response) => {
  const { date, amount, type, details, user_id } = req.body;
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        date: new Date(date).toISOString(), // DateオブジェクトをISO 8601形式の文字列に変換
        amount,
        type,
        details,
        User: { connect: { id: user_id } }, // user_idをUserと関連付ける
      },
    });
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error('Error creating transaction:', (error as Error).message);
    res.status(500).json({ error: '取引の作成に失敗しました。', details: (error as Error).message });
  }
});

// 特定取引の更新
transactionRouter.put('/:id', transactionValidationRules(), validate, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { date, amount, type, details, user_id } = req.body;
  try {
    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: {
        date: new Date(date).toISOString(), // DateオブジェクトをISO 8601形式のオブジェクトに変換
        amount,
        type,
        details,
        User: { connect: { id: user_id } }, // user_idをUserと関連付ける
      },
    });
    res.json(updatedTransaction);
  } catch (error) {
    console.error('Error updating transaction:', (error as Error).message);
    res.status(500).json({ error: '取引の更新に失敗しました。', details: (error as Error).message });
  }
});

// 特定取引の削除
transactionRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.transaction.delete({ where: { id } });
    res.status(204).send();
  } catch (error: unknown) {
    console.error('Error deleting transaction:', (error as Error).message);
    res.status(500).json({ error: '取引の削除に失敗しました。', details: (error as Error).message });
  }
});

export default transactionRouter;

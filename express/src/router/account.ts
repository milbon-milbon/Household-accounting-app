// import { Router, Request, Response } from "express";
// import { PrismaClient } from '@prisma/client';
// import { accountValidationRules, validate } from '../middlewares/validation';

// const AccountsRouter = Router();
// const prisma = new PrismaClient();

// // 全アカウントの取得
// AccountsRouter.get('/', async (req: Request, res: Response) => {
//   try {
//     const accounts = await prisma.account.findMany();
//     res.json(accounts);
//   } catch (error) {
//     console.error('Error fetching accounts:', (error as Error).message);
//     res.status(500).json({ error: 'アカウントの取得に失敗しました。', details: (error as Error).message });
//   }
// });

// // 特定アカウントの取得
// AccountsRouter.get('/:id', async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   try {
//     const account = await prisma.account.findUnique({ where: { id } });
//     if (account) {
//       res.json(account);
//     } else {
//       res.status(404).send('アカウントが見つかりません。');
//     }
//   } catch (error) {
//     console.error('Error fetching account:', (error as Error).message);
//     res.status(500).json({ error: 'アカウントの取得に失敗しました。', details: (error as Error).message });
//   }
// });

// // 新しいアカウントの作成
// AccountsRouter.post('/', accountValidationRules(), validate, async (req: Request, res: Response) => {
//   const { name, balance } = req.body;
//   try {
//     const newAccount = await prisma.account.create({
//       data: {
//         name,
//         balance,
//       },
//     });
//     res.status(201).json(newAccount);
//   } catch (error) {
//     console.error('Error creating account:', (error as Error).message);
//     res.status(500).json({ error: 'アカウントの作成に失敗しました。', details: (error as Error).message });
//   }
// });

// // 特定アカウントの更新
// AccountsRouter.put('/:id', accountValidationRules(), validate, async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   const { name, balance } = req.body;
//   try {
//     const updatedAccount = await prisma.account.update({
//       where: { id },
//       data: {
//         name,
//         balance,
//       },
//     });
//     res.json(updatedAccount);
//   } catch (error) {
//     console.error('Error updating account:', (error as Error).message);
//     res.status(500).json({ error: 'アカウントの更新に失敗しました。', details: (error as Error).message });
//   }
// });

// // 特定アカウントの削除
// AccountsRouter.delete('/:id', async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   try {
//     await prisma.account.delete({ where: { id } });
//     res.status(204).send();
//   } catch (error) {
//     console.error('Error deleting account:', (error as Error).message);
//     res.status(500).json({ error: 'アカウントの削除に失敗しました。', details: (error as Error).message });
//   }
// });

// export default AccountsRouter;
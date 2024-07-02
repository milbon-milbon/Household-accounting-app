// import { Router, Request, Response } from "express";
// // import { PrismaClient } from '@prisma/client';
// import { categoryValidationRules, validate } from '../middlewares/validation';

// const CategoryRouter = Router();
// // const prisma = new PrismaClient();

// // 全カテゴリーの取得
// CategoryRouter.get('/', async (req, res) => {
//   try {
//     const categories = await prisma.category.findMany();
//     res.json(categories);
//   } catch (error) {
//     console.error('Error fetching categories:', (error as Error).message);
//     res.status(500).json({ error: 'カテゴリーの取得に失敗しました。', details: (error as Error).message });
//   }
// });

// // 特定カテゴリーの取得
// CategoryRouter.get('/:id', async (req, res) => {
//   const id = parseInt(req.params.id);
//   try {
//     const category = await prisma.category.findUnique({ where: { id } });
//     if (category) {
//       res.json(category);
//     } else {
//       res.status(404).send('カテゴリーが見つかりません。');
//     }
//   } catch (error) {
//     console.error('Error fetching category:', (error as Error).message);
//     res.status(500).json({ error: 'カテゴリーの取得に失敗しました。', details: (error as Error).message });
//   }
// });

// // 新しいカテゴリーの作成
// CategoryRouter.post('/', categoryValidationRules(), validate, async (req, res) => {
//   const { name } = req.body;
//   try {
//     const newCategory = await prisma.category.create({
//       data: {
//         name,
//       },
//     });
//     res.status(201).json(newCategory);
//   } catch (error) {
//     console.error('Error creating category:', (error as Error).message);
//     res.status(500).json({ error: 'カテゴリーの作成に失敗しました。', details: (error as Error).message });
//   }
// });

// // 特定カテゴリーの更新
// CategoryRouter.put('/:id', categoryValidationRules(), validate, async (req, res) => {
//   const id = parseInt(req.params.id);
//   const { name } = req.body;
//   try {
//     const updatedCategory = await prisma.category.update({
//       where: { id },
//       data: {
//         name,
//       },
//     });
//     res.json(updatedCategory);
//   } catch (error) {
//     console.error('Error updating category:', (error as Error).message);
//     res.status(500).json({ error: 'カテゴリーの更新に失敗しました。', details: (error as Error).message });
//   }
// });

// // 特定カテゴリーの削除
// CategoryRouter.delete('/:id', async (req, res) => {
//   const id = parseInt(req.params.id);
//   try {
//     await prisma.category.delete({ where: { id } });
//     res.status(204).send();
//   } catch (error) {
//     console.error('Error deleting category:', (error as Error).message);
//     res.status(500).json({ error: 'カテゴリーの削除に失敗しました。', details: (error as Error).message });
//   }
// });

// export default CategoryRouter;

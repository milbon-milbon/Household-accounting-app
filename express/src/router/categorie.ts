
import { Router, Request, Response } from "express";
import { categoryValidationRules, validate } from '../middlewares/validation';

const CategorieRouter = Router();

// 仮のデータベース 
const categories = [
  { id: 1, name: "Food" },
  { id: 2, name: "Transport" }
];

// 全カテゴリーの取得
CategorieRouter.get('/', (req, res) => {
  res.json({ categories });
});

// 特定カテゴリーの取得
CategorieRouter.get('/:id', (req, res) => {
  const cate = categories.find(u => u.id === parseInt(req.params.id));
  if (cate) {
    res.json(cate);
  } else {
    res.status(404).send('categories not found');
  }
});

// 新しいカテゴリーの作成
CategorieRouter.post('/', categoryValidationRules(), validate, (req: Request, res: Response) => {
  const newCategory = { id: categories.length + 1, ...req.body };
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

// 特定カテゴリーの更新
CategorieRouter.put('/:id', categoryValidationRules(), validate, (req: Request, res: Response) => {
  const cate = categories.find(u => u.id === parseInt(req.params.id));
  if (cate) {
    Object.assign(cate, req.body);
    res.json(cate);
  } else {
    res.status(404).send('Category not found');
  }
});

// 特定カテゴリーの削除
CategorieRouter.delete('/:id', (req, res) => {
  const index = categories.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    categories.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('categories not found');
  }
});

export default CategorieRouter;
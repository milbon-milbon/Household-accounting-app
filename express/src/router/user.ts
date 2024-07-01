
import { Router, Request, Response } from 'express';
import { userValidationRules, validate } from '../middlewares/validation';

const router = Router();

// 仮のデータベース 
const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" }
];

// 全ユーザーの取得
router.get('/', (req: Request, res: Response) => {
  res.json({ users });
});

// 特定ユーザーの取得
router.get('/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// 新しいユーザーの作成
router.post('/', userValidationRules(), validate, (req: Request, res: Response) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 特定ユーザーの更新
router.put('/:id', userValidationRules(), validate, (req: Request, res: Response) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    Object.assign(user, req.body);
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// 特定ユーザーの削除
router.delete('/:id', (req: Request, res: Response) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    users.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('User not found');
  }
});

export default router;
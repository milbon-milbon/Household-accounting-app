
import { Router, Request, Response } from "express";
import { accountValidationRules, validate } from '../middlewares/validation';

const AccountsRouter = Router();

// 仮のデータベース 
const accounts = [
  {
    "id": 1,
    "name": "Checking Account",
    "balance": 1500.00
  },
  {
    "id": 2,
    "name": "B",
    "balance": 2000.00
  }
];

// 全アカウントの取得
AccountsRouter.get('/', (req, res) => {
  res.json({ accounts });
});

// 特定アカウントの取得
AccountsRouter.get('/:id', (req, res) => {
  const acc = accounts.find(u => u.id === parseInt(req.params.id));
  if (acc) {
    res.json(acc);
  } else {
    res.status(404).send('accounts not found');
  }
});

// 新しいアカウントの作成
AccountsRouter.post('/', accountValidationRules(), validate, (req: Request, res: Response) => {
  const newaccounts = { id: accounts.length + 1, ...req.body };
  accounts.push(newaccounts);
  res.status(201).json(newaccounts);
});

// 特定アカウントの更新
AccountsRouter.put('/:id', accountValidationRules(), validate, (req: Request, res: Response) => {
  const acc = accounts.find(u => u.id === parseInt(req.params.id));
  if (acc) {
    Object.assign(acc, req.body);
    res.json(acc);
  } else {
    res.status(404).send('accounts not found');
  }
});

// 特定アカウントの削除
AccountsRouter.delete('/:id', (req, res) => {
  const index = accounts.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    accounts.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('accounts not found');
  }
});

export default AccountsRouter;
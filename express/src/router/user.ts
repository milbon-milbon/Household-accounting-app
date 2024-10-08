import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { userValidationRules, validate } from "../middlewares/validation";
import bcrypt from "bcryptjs";

const userRouter = Router();
const prisma = new PrismaClient();

const hashPassword = (password: string): string => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};
// 全ユーザーの取得
userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", (error as Error).message);
    res.status(500).json({
      error: "ユーザーの取得に失敗しました。",
      details: (error as Error).message,
    });
  }
});

// 特定ユーザーの取得
userRouter.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("ユーザーが見つかりません。");
    }
  } catch (error: unknown) {
    console.error("Error fetching user:", (error as Error).message);
    res.status(500).json({
      error: "ユーザーの取得に失敗しました。",
      details: (error as Error).message,
    });
  }
});
//ユーザーが存在するかどうかのチェック
userRouter.get("/user-exists/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking user existence:", (error as Error).message);
    res.status(500).json({
      error: "Internal Server Error",
      details: (error as Error).message,
    });
  }
});
// 新しいユーザーの作成
userRouter.post(
  "/",
  userValidationRules(),
  validate,
  async (req: Request, res: Response) => {
    const { mail, name, member, password } = req.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          mail,
          name,
          member,
          password_hash: hashPassword(password), // パスワードをハッシュ化する
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", (error as Error).message);
      res.status(500).json({
        error: "ユーザーの作成に失敗しました。",
        details: (error as Error).message,
      });
    }
  },
);
// 特定ユーザーの更新
userRouter.put(
  "/:id",
  userValidationRules(),
  validate,
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { mail, name } = req.body;
    try {
      const updateduser = await prisma.user.update({
        where: { id },
        data: {
          mail,
          name,
        },
      });
      res.json(updateduser);
    } catch (error) {
      console.error("Error updating user:", (error as Error).message);
      res.status(500).json({
        error: "ユーザーの更新に失敗しました。",
        details: (error as Error).message,
      });
    }
  },
);

// 特定ユーザーの削除
userRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.user.delete({ where: { id } });
    res.status(204).send();
  } catch (error: unknown) {
    console.error("Error deleting user:", (error as Error).message);
    res.status(500).json({
      error: "ユーザーの削除に失敗しました。",
      details: (error as Error).message,
    });
  }
});

export default userRouter;

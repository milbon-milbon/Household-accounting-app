import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { userValidationRules, validate } from "../middlewares/validation";

const userRouter = Router();
const prisma = new PrismaClient();

// 全ユーザーの取得
userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", (error as Error).message);
    res
      .status(500)
      .json({
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
    res
      .status(500)
      .json({
        error: "ユーザーの取得に失敗しました。",
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
    const { email, name } = req.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", (error as Error).message);
      res
        .status(500)
        .json({
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
    const { email, name } = req.body;
    try {
      const updateduser = await prisma.user.update({
        where: { id },
        data: {
          email,
          name,
        },
      });
      res.json(updateduser);
    } catch (error) {
      console.error("Error updating user:", (error as Error).message);
      res
        .status(500)
        .json({
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
    res
      .status(500)
      .json({
        error: "ユーザーの削除に失敗しました。",
        details: (error as Error).message,
      });
  }
});

export default userValidationRules;

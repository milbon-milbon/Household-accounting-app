"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const validation_1 = require("../middlewares/validation");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const hashPassword = (password) => {
    const saltRounds = 10;
    return bcryptjs_1.default.hashSync(password, saltRounds);
};
// 全ユーザーの取得
userRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({
            error: "ユーザーの取得に失敗しました。",
            details: error.message,
        });
    }
}));
// 特定ユーザーの取得
userRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const user = yield prisma.user.findUnique({ where: { id } });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).send("ユーザーが見つかりません。");
        }
    }
    catch (error) {
        console.error("Error fetching user:", error.message);
        res.status(500).json({
            error: "ユーザーの取得に失敗しました。",
            details: error.message,
        });
    }
}));
//ユーザーが存在するかどうかのチェック
userRouter.get("/user-exists/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const user = yield prisma.user.findUnique({ where: { id } });
        if (user) {
            res.json({ exists: true });
        }
        else {
            res.json({ exists: false });
        }
    }
    catch (error) {
        console.error("Error checking user existence:", error.message);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
}));
// 新しいユーザーの作成
userRouter.post("/", (0, validation_1.userValidationRules)(), validation_1.validate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mail, name, member, password } = req.body;
    try {
        const newUser = yield prisma.user.create({
            data: {
                mail,
                name,
                member,
                password_hash: hashPassword(password), // パスワードをハッシュ化する
            },
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({
            error: "ユーザーの作成に失敗しました。",
            details: error.message,
        });
    }
}));
// 特定ユーザーの更新
userRouter.put("/:id", (0, validation_1.userValidationRules)(), validation_1.validate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { mail, name } = req.body;
    try {
        const updateduser = yield prisma.user.update({
            where: { id },
            data: {
                mail,
                name,
            },
        });
        res.json(updateduser);
    }
    catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({
            error: "ユーザーの更新に失敗しました。",
            details: error.message,
        });
    }
}));
// 特定ユーザーの削除
userRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield prisma.user.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({
            error: "ユーザーの削除に失敗しました。",
            details: error.message,
        });
    }
}));
exports.default = userRouter;

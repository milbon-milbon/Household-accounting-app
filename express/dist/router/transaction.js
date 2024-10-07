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
Object.defineProperty(exports, "__esModule", { value: true });
// transaction.ts
const express_1 = require("express");
const client_1 = require("@prisma/client");
const validation_1 = require("../middlewares/validation");
const transactionRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// 全取引の取得
transactionRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield prisma.transaction.findMany();
        res.json(transactions);
    }
    catch (error) {
        console.error("Error fetching transactions:", error.message);
        res.status(500).json({
            error: "取引の取得に失敗しました。",
            details: error.message,
        });
    }
}));
// 特定取引の取得
transactionRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send("無効なIDです。");
    }
    try {
        const transaction = yield prisma.transaction.findUnique({ where: { id } });
        if (transaction) {
            res.json(transaction);
        }
        else {
            res.status(404).send("取引が見つかりません。");
        }
    }
    catch (error) {
        console.error("Error fetching transaction:", error.message);
        res.status(500).json({
            error: "取引の取得に失敗しました。",
            details: error.message,
        });
    }
}));
// 新しい取引の作成
transactionRouter.post("/", (0, validation_1.transactionValidationRules)("POST"), validation_1.validate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, amount, type, details, userId } = req.body;
    try {
        const newTransaction = yield prisma.transaction.create({
            data: {
                date: new Date(date).toISOString(),
                amount,
                type,
                details,
                User: { connect: { id: userId } },
            },
        });
        res.status(201).json(newTransaction);
    }
    catch (error) {
        console.error("Error creating transaction:", error.message);
        res.status(500).json({
            error: "取引の作成に失敗しました。IDを確認してください",
            details: error.message,
        });
    }
}));
// 特定の取引の更新
transactionRouter.put("/:id", (0, validation_1.transactionValidationRules)("PUT"), validation_1.validate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { date, amount, type, details, userId } = req.body;
    try {
        if (isNaN(id)) {
            return res.status(400).send("無効なIDです。");
        }
        const updatedTransaction = yield prisma.transaction.update({
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
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025") {
            return res.status(404).send("取引が見つかりません。");
        }
        console.error("Error updating transaction:", error.message);
        res.status(500).json({
            error: "取引の更新に失敗しました。IDを確認してください",
            details: error.message,
        });
    }
}));
// 特定の取引の削除
transactionRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        if (isNaN(id)) {
            return res.status(400).send("無効なIDです。");
        }
        yield prisma.transaction.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025") {
            return res.status(404).send("取引が見つかりません。");
        }
        res.status(500).json({
            error: "取引の削除に失敗しました。",
            details: error.message,
        });
    }
}));
exports.default = transactionRouter;

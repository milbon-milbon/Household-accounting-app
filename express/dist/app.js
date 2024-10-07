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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const client_1 = require("@prisma/client");
const user_1 = __importDefault(require("./router/user"));
const transaction_1 = __importDefault(require("./router/transaction"));
const validation_1 = require("./middlewares/validation");
const logger_1 = __importDefault(require("./context/logger"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = process.env.PORT || 4000;
// morgan のログを winston を経由して出力する
app.use((0, morgan_1.default)("combined", {
    stream: {
        write(message) {
            logger_1.default.info(message.trim());
        },
    },
}));
// CORSミドルウェアを使用
app.use((0, cors_1.default)());
// ミドルウェアを追加
app.use(express_1.default.json(), validation_1.invalidJsonHandler);
app.use((req, _res, next) => {
    logger_1.default.debug(`Received request: ${req.method} ${req.url}`);
    next();
});
app.use("/users", user_1.default);
app.use("/transactions", transaction_1.default);
app.get("/favicon.ico", (_req, res) => res.status(204));
// エラーハンドリングミドルウェアを追加
app.use((err, req, res, next) => {
    logger_1.default.error(err.stack || err.message);
    res
        .status(500)
        .json({ error: "Internal Server Error", details: err.message });
});
//Prismaクライアントのシャットダウン処理を追加
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
    process.exit();
}));
if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
        logger_1.default.debug(`Server running on http://localhost:${port}`);
    });
}
app.get("/", (_req, res) => {
    res.send("Hello World!");
});
exports.default = app;

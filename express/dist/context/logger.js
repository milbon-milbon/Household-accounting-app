"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const dotenv_1 = __importDefault(require("dotenv"));
// .env ファイルから環境変数を読み込む
dotenv_1.default.config();
// 環境変数からログレベルを取得（デフォルトは 'info'）
const logLevel = process.env.LOG_LEVEL || "info";
console.log(`Log level set to: ${logLevel}`);
const logger = winston_1.default.createLogger({
    level: logLevel,
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename: "logfile.log" }),
    ],
});
exports.default = logger;

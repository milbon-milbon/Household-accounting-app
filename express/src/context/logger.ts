import winston from 'winston';
import dotenv from 'dotenv';

// .env ファイルから環境変数を読み込む 
dotenv.config();

// 環境変数からログレベルを取得（デフォルトは 'info'）
const logLevel = process.env.LOG_LEVEL || 'info';
console.log(`Log level set to: ${logLevel}`);


const logger = winston.createLogger({
    level: logLevel,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logfile.log' })
    ]
});

export default logger;
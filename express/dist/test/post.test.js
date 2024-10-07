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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
jest.setTimeout(10000); // タイムアウトを10秒に設定
let server;
beforeAll((done) => {
    server = app_1.default.listen(4000, done);
});
afterAll((done) => {
    server.close(() => {
        done();
    });
});
// 正常系: POST /transactions
describe("POST /transactions", () => {
    it("should create a new transaction", () => __awaiter(void 0, void 0, void 0, function* () {
        const newTransaction = {
            date: "2024-08-11T10:49:13.977Z",
            amount: 5555,
            type: "入金",
            details: "Test Deposit",
            userId: 1,
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions")
            .send(newTransaction);
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(newTransaction);
    }));
});
// 異常系: POST /必須フィールドが不足している場合
it("should return 400 if required fields are missing", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default).post("/transactions").send({});
    expect(response.status).toBe(400);
}));
// 境界数値系: POST /typeフィールドが192文字の場合
it("should return 400 if `type` field exceeds the maximum length", () => __awaiter(void 0, void 0, void 0, function* () {
    // 192文字以上のtypeフィールドを含むデータ
    const newTransaction = {
        date: "2024-08-11T10:49:13.977Z",
        amount: 1000,
        type: "a".repeat(192), // 192文字の長い文字列
        details: "Test Deposit",
        userId: 1,
    };
    const response = yield (0, supertest_1.default)(app_1.default)
        .post("/transactions")
        .send(newTransaction);
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(expect.arrayContaining([
        expect.objectContaining({
            param: "type",
            msg: "Type must be at most 191 characters long.",
        }),
    ]));
}));
// 境界数値系: POST /typeフィールドが191文字の場合
it("should create a new transaction", () => __awaiter(void 0, void 0, void 0, function* () {
    const newTransaction = {
        date: "2024-08-11T10:49:13.977Z",
        amount: 1000,
        type: "a".repeat(191), //191文字
        details: "Test Deposit",
        userId: 1,
    };
    const response = yield (0, supertest_1.default)(app_1.default)
        .post("/transactions")
        .send(newTransaction);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newTransaction);
}));
// 境界数値系: POST /detailsフィールドが192文字の場合
it("should return 400 if `details` field exceeds the maximum length", () => __awaiter(void 0, void 0, void 0, function* () {
    // 192文字以上のtypeフィールドを含むデータ
    const newTransaction = {
        date: "2024-08-11T10:49:13.977Z",
        amount: 1000,
        type: "出金",
        details: "a".repeat(192), // 192文字の長い文字列
        userId: 1,
    };
    const response = yield (0, supertest_1.default)(app_1.default)
        .post("/transactions")
        .send(newTransaction);
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(expect.arrayContaining([
        expect.objectContaining({
            param: "details",
            msg: "Type must be at most 191 characters long.",
        }),
    ]));
}));
// 境界数値系: POST /detailsフィールドが191文字の場合
it("should create a new transaction", () => __awaiter(void 0, void 0, void 0, function* () {
    const newTransaction = {
        date: "2024-08-11T10:49:13.977Z",
        amount: 1000,
        type: "出金",
        details: "a".repeat(191), // 191文字の長い文字列
        userId: 1,
    };
    const response = yield (0, supertest_1.default)(app_1.default)
        .post("/transactions")
        .send(newTransaction);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newTransaction);
}));

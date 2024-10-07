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
// 正常系: GET / transactions(フィールド);
describe("GET /transactions", () => {
    it("should return a list of transactions", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/transactions");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                amount: expect.any(Number),
                date: expect.any(String),
                type: expect.any(String),
                details: expect.any(String),
                userId: expect.any(Number),
            }),
        ]));
    }));
});
//正常系（特定ID）
describe("GET /transactions/:id", () => {
    it("should return a specific transaction", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/transactions/60");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 60,
            date: "2024-08-11T10:49:13.977Z",
            amount: 1000,
            type: "入金",
            details: "Test Deposit",
            userId: 1,
        });
    }));
});
//異常系（特定ID）
describe("GET /transactions/:id", () => {
    it("should return 400 if ID is not a number", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/transactions/abc");
        expect(response.status).toBe(400);
        expect(response.text).toBe("無効なIDです。");
    }));
});

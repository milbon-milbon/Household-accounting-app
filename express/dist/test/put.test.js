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
describe("PUT /transactions/:id", () => {
    let server;
    beforeAll((done) => {
        server = app_1.default.listen(4000, done);
    });
    afterAll((done) => {
        server.close(done);
    });
    //正常系
    it("should update a transaction", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedTransaction = {
            date: "2024-07-05T10:49:13.977Z",
            amount: 1500,
            type: "出金",
            details: "更新したよ❣",
            userId: 1,
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .put("/transactions/135")
            .send(updatedTransaction);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(updatedTransaction);
    }));
    //異常系
    it("should return 400 if ID is not a number", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedTransaction = {
            date: "2024-08-11T10:49:13.977Z",
            amount: 1500,
            type: "出金",
            details: "Updated Deposit",
            userId: 1,
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .put("/transactions/abc")
            .send(updatedTransaction);
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toBe("Invalid ID format.");
    }));
    //異常系
    it("should return 404 if transaction does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedTransaction = {
            date: "2024-08-11T10:49:13.977Z",
            amount: 1500,
            type: "出金",
            details: "Updated Deposit",
            userId: 1,
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .put("/transactions/9999")
            .send(updatedTransaction);
        expect(response.status).toBe(404);
        expect(response.text).toBe("取引が見つかりません。");
    }));
    //異常系※モックが必要なため、コメントアウトステイ
    //   it("should return 500 if update fails", async () => {
    //     const updatedTransaction = {
    //       date: "2024-08-11T10:49:13.977Z",
    //       amount: 1500,
    //       type: "出金",
    //       details: "Updated Deposit",
    //       userId: 1,
    //     };
    //     const response = await request(app).put("/transactions/100").send({});
    //     console.log("Response:", response.body); // レスポンスの内容をログ出力
    //     expect(response.status).toBe(500);
    //     expect(response.body.error).toBe("取引の更新に失敗しました。");
    //   });
});

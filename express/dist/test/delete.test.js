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
describe("DELETE /transactions/:id", () => {
    let server;
    beforeAll((done) => {
        server = app_1.default.listen(4000, done);
    });
    afterAll((done) => {
        server.close(done);
    });
    //正常系
    it("should delete a transaction", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).delete("/transactions/170");
        expect(response.status).toBe(204);
    }));
    //異常系
    it("should return 400 if ID is not a number", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).delete("/transactions/abc");
        expect(response.status).toBe(400);
        expect(response.text).toBe("無効なIDです。");
    }));
    //異常系
    it("should return 404 if transaction does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).delete("/transactions/9999");
        expect(response.status).toBe(404);
        expect(response.text).toBe("取引が見つかりません。");
    }));
    //異常系※モック必要なため、コメントアウトステイ
    //   it("should return 500 if delete fails", async () => {
    //     const response = await request(app).delete("/transactions/51");
    //     expect(response.status).toBe(500);
    //     expect(response.body.error).toBe("取引の削除に失敗しました。");
    //   });
});

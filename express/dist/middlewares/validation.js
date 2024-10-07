"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idValidationRules = void 0;
exports.userValidationRules = userValidationRules;
exports.transactionValidationRules = transactionValidationRules;
exports.validate = validate;
exports.errorHandler = errorHandler;
exports.invalidJsonHandler = invalidJsonHandler;
const express_validator_1 = require("express-validator");
// 共通のバリデーションルール(モジュール化)
const checkNotEmpty = (field) => (0, express_validator_1.body)(field)
    .notEmpty()
    .withMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
const checkIsEmail = () => (0, express_validator_1.body)("email").isEmail().withMessage("Email is invalid");
// バリデーションルールのセット
function userValidationRules() {
    return [checkNotEmpty("name"), checkIsEmail()];
}
// 取引バリデーションルール
function transactionValidationRules(method) {
    if (method === "POST") {
        return [
            (0, express_validator_1.body)("date")
                .notEmpty()
                .withMessage("Date is required.")
                .isISO8601()
                .withMessage("Invalid date format."),
            (0, express_validator_1.body)("amount")
                .notEmpty()
                .withMessage("Amount is required.")
                .isFloat()
                .withMessage("Invalid amount format."),
            (0, express_validator_1.body)("type")
                .notEmpty()
                .withMessage("Type is required.")
                .isString()
                .withMessage("Invalid type format.")
                .isLength({ max: 191 })
                .withMessage("Type must be at most 191 characters long."),
            (0, express_validator_1.body)("details")
                .optional()
                .isString()
                .withMessage("Invalid details format.")
                .isLength({ max: 191 })
                .withMessage("Type must be at most 191 characters long."),
            (0, express_validator_1.body)("userId")
                .notEmpty()
                .withMessage("User ID is required.")
                .isInt()
                .withMessage("Invalid user ID format."),
        ];
    }
    else if (method === "PUT") {
        return [
            (0, express_validator_1.param)("id").isInt().withMessage("Invalid ID format."),
            (0, express_validator_1.body)("date")
                .notEmpty()
                .withMessage("Date is required.")
                .isISO8601()
                .withMessage("Invalid date format."),
            (0, express_validator_1.body)("amount")
                .notEmpty()
                .withMessage("Amount is required.")
                .isFloat()
                .withMessage("Invalid amount format."),
            (0, express_validator_1.body)("type")
                .notEmpty()
                .withMessage("Type is required.")
                .isString()
                .withMessage("Invalid type format.")
                .isLength({ max: 191 })
                .withMessage("Type must be at most 191 characters long."),
            (0, express_validator_1.body)("details")
                .optional()
                .isString()
                .withMessage("Invalid details format.")
                .isLength({ max: 191 })
                .withMessage("Type must be at most 191 characters long."),
            (0, express_validator_1.body)("userId")
                .notEmpty()
                .withMessage("User ID is required.")
                .isInt()
                .withMessage("Invalid user ID format."),
        ];
    }
    else {
        // デフォルトの戻り値として空の配列を返す
        return [];
    }
}
// IDバリデーションルール
const idValidationRules = () => {
    return [(0, express_validator_1.param)("id").isInt().withMessage("Invalid ID format.")];
};
exports.idValidationRules = idValidationRules;
// バリデーションエラーの処理
function validate(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map((error) => ({
                param: error.param,
                msg: error.msg,
            })),
        });
    }
    next();
}
// エラーハンドリングミドルウェア
function errorHandler(err, _req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
}
// 不正なJSON形式のリクエストをキャッチするミドルウェア
function invalidJsonHandler(err, _req, res, next) {
    if (err instanceof SyntaxError && "body" in err) {
        console.error("Bad JSON");
        return res.status(400).json({ error: "Bad Request: Invalid JSON" });
    }
    next(err);
}

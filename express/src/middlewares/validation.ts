import { Request, Response, NextFunction } from "express";
import {
  body,
  param,
  validationResult,
  ValidationError,
  ValidationChain,
} from "express-validator";

type Method = "POST" | "PUT" | "DELETE" | "GET";

// 共通のバリデーションルール(モジュール化)
const checkNotEmpty = (field: string) =>
  body(field)
    .notEmpty()
    .withMessage(
      `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
    );
const checkIsEmail = () =>
  body("email").isEmail().withMessage("Email is invalid");

// バリデーションルールのセット
export function userValidationRules() {
  return [checkNotEmpty("name"), checkIsEmail()];
}

// 取引バリデーションルール

export function transactionValidationRules(method: Method): ValidationChain[] {
  if (method === "POST") {
    return [
      body("date")
        .notEmpty()
        .withMessage("Date is required.")
        .isISO8601()
        .withMessage("Invalid date format."),
      body("amount")
        .notEmpty()
        .withMessage("Amount is required.")
        .isFloat()
        .withMessage("Invalid amount format."),
      body("type")
        .notEmpty()
        .withMessage("Type is required.")
        .isString()
        .withMessage("Invalid type format.")
        .isLength({ max: 191 })
        .withMessage("Type must be at most 191 characters long."),
      body("details")
        .optional()
        .isString()
        .withMessage("Invalid details format.")
        .isLength({ max: 191 })
        .withMessage("Type must be at most 191 characters long."),
      body("userId")
        .notEmpty()
        .withMessage("User ID is required.")
        .isInt()
        .withMessage("Invalid user ID format."),
    ];
  } else if (method === "PUT") {
    return [
      param("id").isInt().withMessage("Invalid ID format."),
      body("date")
        .notEmpty()
        .withMessage("Date is required.")
        .isISO8601()
        .withMessage("Invalid date format."),
      body("amount")
        .notEmpty()
        .withMessage("Amount is required.")
        .isFloat()
        .withMessage("Invalid amount format."),
      body("type")
        .notEmpty()
        .withMessage("Type is required.")
        .isString()
        .withMessage("Invalid type format.")
        .isLength({ max: 191 })
        .withMessage("Type must be at most 191 characters long."),
      body("details")
        .optional()
        .isString()
        .withMessage("Invalid details format.")
        .isLength({ max: 191 })
        .withMessage("Type must be at most 191 characters long."),
      body("userId")
        .notEmpty()
        .withMessage("User ID is required.")
        .isInt()
        .withMessage("Invalid user ID format."),
    ];
  } else {
    // デフォルトの戻り値として空の配列を返す
    return [];
  }
}

// IDバリデーションルール
export const idValidationRules = () => {
  return [param("id").isInt().withMessage("Invalid ID format.")];
};

// バリデーションエラーの処理
export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((error: ValidationError) => ({
        param: error.param,
        msg: error.msg,
      })),
    });
  }
  next();
}

// エラーハンドリングミドルウェア
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error((err as Error).stack);
  res.status(500).json({ error: "Internal Server Error" });
}

// 不正なJSON形式のリクエストをキャッチするミドルウェア
export function invalidJsonHandler(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof SyntaxError && "body" in err) {
    console.error("Bad JSON");
    return res.status(400).json({ error: "Bad Request: Invalid JSON" });
  }
  next(err);
}

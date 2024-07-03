import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationError } from "express-validator";

// 共通のバリデーションルール(モジュール化)
const checkNotEmpty = (field: string) =>
  body(field)
    .notEmpty()
    .withMessage(
      `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
    );
const checkIsEmail = () =>
  body("email").isEmail().withMessage("Email is invalid");
const checkIsInt = (field: string) =>
  body(field)
    .isInt()
    .withMessage(
      `${field.charAt(0).toUpperCase() + field.slice(1)} must be an integer`,
    );
const checkIsFloatPositive = (field: string) =>
  body(field)
    .isFloat({ gt: 0 })
    .withMessage(
      `${field.charAt(0).toUpperCase() + field.slice(1)} must be a positive number`,
    );
const checkIsISO8601 = (field: string) =>
  body(field)
    .isISO8601()
    .withMessage(
      `${field.charAt(0).toUpperCase() + field.slice(1)} must be a valid ISO 8601 date`,
    );
const checkOptionalString = (field: string) =>
  body(field)
    .optional()
    .isString()
    .withMessage(
      `${field.charAt(0).toUpperCase() + field.slice(1)} must be a string`,
    );

// バリデーションルールのセット
export function userValidationRules() {
  return [checkNotEmpty("name"), checkIsEmail()];
}

export function transactionValidationRules() {
  return [
    checkIsInt("userId"),
    checkIsFloatPositive("amount"),
    checkIsISO8601("date"),
    checkOptionalString("details"),
  ];
}

// バリデーションエラーの処理
export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((error: ValidationError) => ({
        param: error.param,
        msg: error.msg,
      })),
    });
  }
  next();
}

// エラーハンドリングミドルウェア
export function errorHandler(err: unknown, _req: Request, res: Response) {
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

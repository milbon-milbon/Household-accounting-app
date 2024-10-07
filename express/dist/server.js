"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import http from "http";
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./context/logger"));
const port = process.env.PORT || 4000;
if (process.env.NODE_ENV !== "test") {
    app_1.default.listen(port, () => {
        logger_1.default.debug(`Server running on http://localhost:${port}`);
    });
}
exports.default = app_1.default;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class customError extends Error {
    constructor(message, statusCode) {
        super(message);
        statusCode = statusCode;
    }
}
exports.default = customError;

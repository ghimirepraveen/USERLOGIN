"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    err.message = err.message || "something went wrong";
    err.statusCode = err.statusCode || 400;
    return res
        .status(err.statusCode)
        .json({ status: err.statusCode, error: err.message });
}
exports.default = errorHandler;

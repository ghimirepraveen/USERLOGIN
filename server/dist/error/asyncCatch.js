"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function asyncCatch(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
exports.default = asyncCatch;

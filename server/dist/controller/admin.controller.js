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
exports.Admin = void 0;
const asyncCatch_1 = __importDefault(require("../error/asyncCatch"));
const custom_error_1 = __importDefault(require("../error/custom.error"));
const db_1 = require("../model/db");
exports.Admin = {
    getallusers: (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const role = req.user.role;
        console.log(role);
        if (role !== "ADMIN") {
            throw new custom_error_1.default("Not authorized", 401);
        }
        const users = yield db_1.prisma.user.findMany();
        res.status(200).json(users);
    })),
};

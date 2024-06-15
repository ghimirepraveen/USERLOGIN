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
exports.User = void 0;
const asyncCatch_1 = __importDefault(require("../error/asyncCatch"));
const custom_error_1 = __importDefault(require("../error/custom.error"));
const db_1 = require("../model/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.User = {
    signUp: (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password, name, address, phone } = req.body;
        if (!email || !password || !name || !address || !phone) {
            throw new custom_error_1.default("Missing Required Fields", 400);
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const admin = process.env.ADMIN_EMAIL;
        let role = email === admin ? "ADMIN" : "USER";
        const existingUser = yield db_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            throw new custom_error_1.default("Email Already Exist", 400);
        }
        const user = yield db_1.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                address,
                phone,
                role: role,
            },
        });
        let santizedUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            address: user.address,
            phone: user.phone,
            role: user.role,
        };
        res.status(201).json(santizedUser);
    })),
    login: (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new custom_error_1.default("Email and Password are required", 400);
        }
        const user = yield db_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new custom_error_1.default("User Not Found", 404);
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new custom_error_1.default("Invalid Credentials", 401);
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        let sanitizedUser = Object.assign(Object.assign({}, user), { id: undefined, password: undefined, createdAt: undefined, updatedAt: undefined });
        res
            .status(200)
            .cookie(process.env.COOKIES_NAME, JSON.stringify({ token, user: sanitizedUser }), {
            path: "/",
            secure: false,
            maxAge: 3600,
        })
            .json({
            user: sanitizedUser,
            token,
        });
    })),
    profile: (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.user.id;
        const user = yield db_1.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                email: true,
                name: true,
                address: true,
                phone: true,
                role: true,
            },
        });
        res.status(200).json(user);
    })),
    logout: (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.clearCookie(process.env.COOKIES_NAME).send("logged out");
    })),
    delete: (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.user.id;
        yield db_1.prisma.user.delete({
            where: {
                id: userId,
            },
        });
        res.status(204).send("user deleted");
    })),
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const admin_controller_1 = require("../controller/admin.controller");
const auth_1 = __importDefault(require("../middleware/auth"));
const userRouter = express_1.default.Router();
userRouter.post("/signup", user_controller_1.User.signUp);
userRouter.post("/signin", user_controller_1.User.login);
userRouter.use(auth_1.default);
userRouter.get("/profile", user_controller_1.User.profile);
userRouter.post("/logout", user_controller_1.User.logout);
userRouter.delete("/delete", user_controller_1.User.delete);
userRouter.get("/allusers", admin_controller_1.Admin.getallusers);
exports.default = userRouter;

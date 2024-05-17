import express from "express";
import { User } from "../controller/user.controller";
import { Admin } from "../controller/admin.controller";
import auth from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/signup", User.signUp);
userRouter.post("/signin", User.login);

userRouter.use(auth);
userRouter.get("/profile", User.profile);
userRouter.post("/logout", User.logout);
userRouter.delete("/delete", User.delete);
userRouter.get("/allusers", Admin.getallusers);

export default userRouter;

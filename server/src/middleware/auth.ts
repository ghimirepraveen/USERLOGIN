import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new Error("Not authorized");
  }

  const user: any = jwt.verify(token, process.env.JWT_SECRET as string);

  req.user = user;

  next();
};
export default auth;

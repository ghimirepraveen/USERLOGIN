import asyncCatch from "../error/asyncCatch";
import { Request, Response } from "express";
import customError from "../error/custom.error";
import { prisma } from "../model/db";

export const Admin = {
  getallusers: asyncCatch(async (req: Request, res: Response) => {
    const role = req.user.role;
    console.log(role);

    if (role !== "ADMIN") {
      throw new customError("Not authorized", 401);
    }

    const users = await prisma.user.findMany();

    res.status(200).json(users);
  }),
};

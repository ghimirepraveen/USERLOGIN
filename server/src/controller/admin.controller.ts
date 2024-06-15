import asyncCatch from "../error/asyncCatch";
import { Request, Response } from "express";
import customError from "../error/custom.error";
import { prisma } from "../model/db";

export const Admin = {
  getallusers: asyncCatch(async (req: Request, res: Response) => {
    const role = req.user.role;

    if (role !== "ADMIN") {
      throw new customError("Not authorized", 401);
    }


    

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({
      skip,
      take: limit,
    });

    const totalUsers = await prisma.user.count();
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({ users: users || [], totalPages, currentPage: page });
  }),
};

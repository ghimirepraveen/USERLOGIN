import asyncCatch from "../error/asyncCatch";
import { Request, Response } from "express";
import customError from "../error/custom.error";
import { prisma } from "../model/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const User = {
  signUp: asyncCatch(async (req: Request, res: Response) => {
    const { email, password, name, address, phone } = req.body;

    if (!email || !password || !name || !address || !phone) {
      throw new customError("Missing Required Fields", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = process.env.ADMIN_EMAIL as string;
    let role = email === admin ? "ADMIN" : "USER";

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new customError("Email Already Exist", 400);
    }

    const user = await prisma.user.create({
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
  }),

  login: asyncCatch(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new customError("Email and Password are Required", 400);
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new customError("User Not Found", 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new customError("Invalid Credentials", 401);
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },

      process.env.JWT_SECRET as string,
      {
        expiresIn: "6h",
      }
    );

    let sanitizedUser = {
      ...user,
      id: undefined,
      password: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    };

    res
      .status(200)
      .cookie(
        process.env.COOKIES_NAME as string,
        JSON.stringify({ token, user: sanitizedUser }),
        {
          path: "/",
          secure: false,
          maxAge: 3600,
        }
      )

      .json({
        user: sanitizedUser,
        token,
      });
  }),

  profile: asyncCatch(async (req: Request, res: Response) => {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
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
  }),

  logout: asyncCatch(async (req: Request, res: Response) => {
    res.clearCookie(process.env.COOKIES_NAME as string).send("logged out");
  }),

  delete: asyncCatch(async (req: Request, res: Response) => {
    const userId = req.user.id;

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    res.status(204).send("User Deleted");
  }),
};

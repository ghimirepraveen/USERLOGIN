import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

export default function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.message = err.message || "something went wrong";
  err.statusCode = err.statusCode || 400;
  return res
    .status(err.statusCode)
    .json({ status: err.statusCode, error: err.message });
}

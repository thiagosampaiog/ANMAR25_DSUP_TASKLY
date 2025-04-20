import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./appError.js";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Validation Error",
      errors: err.errors,
    });
    return;
  }

  if (err instanceof AppError) {
   res.status(err.statusCode).json({ message: err.message });
    return;
  }

  console.error("Internal Error", err);
 res.status(500).json({ message: "Internal Server Error" });
  return;
};

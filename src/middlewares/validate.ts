import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { ZodError } from "zod";

export const validateData =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
 
      req.body = await schema.parseAsync(req.body);
      next();
    
  };

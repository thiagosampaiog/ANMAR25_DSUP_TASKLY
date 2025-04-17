import { NextFunction, Request, Response } from "express";
import { AnyZodObject, object, ZodError } from "zod";

export const validateData =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {

      if(req.body) {
      await schema.parseAsync(req.body);
    }

    if(req.params || Object.keys(req.params).length > 0){
      await schema.parseAsync(req.params);
    }

    if(req.query || Object.keys(req.query).length > 0){
      await schema.parseAsync(req.query);
    }
    
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Validation Error",
          errors: error.flatten(),
        });
        return;
      }
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  };

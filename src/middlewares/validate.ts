import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validateData =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {

      await schema.parseAsync(req.body);
    
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Body Validation Error",
          errors: error.flatten(),  
        });
        return;
      }
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  };


  export const validateParams = 
  (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
  
        await schema.parseAsync(req.params);
      
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          res.status(400).json({
            message: "Params Validation Error",
            errors: error.flatten(),  
          });
          return;
        }
        res.status(500).json({ message: "Internal Server Error" });
        return;
      }
    };

    export const validateQuery =
    (schema: AnyZodObject) =>
      async (req: Request, res: Response, next: NextFunction) => {
        try {
    
          await schema.parseAsync(req.query);
        
          next();
        } catch (error) {
          if (error instanceof ZodError) {
            res.status(400).json({
              message: "Query Validation Error",
              errors: error.flatten(),  
            });
            return;
          }
          res.status(500).json({ message: "Internal Server Error" });
          return;
        }
      };
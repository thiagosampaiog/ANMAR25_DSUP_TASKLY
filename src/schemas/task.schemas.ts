import { z } from "zod";

export const createTaskSchema = z.object({
     title: z.string().min(1, "Title is required"),
     description: z.string().min(1, "Description is required"),
});

export const updateTaskSchema = z.object({
     title: z.string(),
     description: z.string().optional(),
     status: z.enum(["Todo","InProgress","Done"]).optional(),
});


export const paramsIdSchema = z.object({
     id: z.coerce.number().int().positive()
})

export const paramsTaskIdSchema = z.object({
     taskId: z.coerce.number().int().positive()
})

export const taskQuerySchema = z.object({
     skip: z.coerce.number().int().nonnegative().default(0), 
     take: z.coerce.number().int().positive().default(10),  
     status: z.enum(["Todo", "InProgress", "Done"]).optional(), 
     priority: z.string().optional(), 
     title: z.string().optional(),    
 });
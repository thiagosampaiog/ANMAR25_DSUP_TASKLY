import { z } from "zod";

export const createTaskSchema = z.object({
     title: z.string().min(1, "Title is required"),
     description: z.string().min(1, "Description is required"),
});

export const updateTaskSchema = z.object({
     title: z.string(),
     description: z.string(),
     status: z.enum(["Todo","InProgress","Done"]).optional(),
});

export const querySchema = z.object({
     q: z.string().min(1),
     sort: z.string().optional(),
})

export const paramsIdSchema = z.object({
     id: z.coerce.number().int().positive()
})

export const paramsTaskIdSchema = z.object({
     taskId: z.coerce.number().int().positive()
})
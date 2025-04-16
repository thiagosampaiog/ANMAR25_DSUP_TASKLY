import { z } from "zod";




export const createNoteSchema = z.object({
     content: z.string().min(1, 'Content is Required'),
     taskId: z.number()
})

export const updateNoteSchema = z.object({
     content: z.string().min(1, 'Content is Required'),
     taskId: z.number()
})
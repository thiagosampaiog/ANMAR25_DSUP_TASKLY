import { Router } from "express";
import { NoteController } from "../controllers/note.controller.js";
import { validateData, validateParams } from "../middlewares/validate.js";
import { createNoteSchema, updateNoteSchema } from "../schemas/note.schemas.js";
import { paramsIdSchema, paramsTaskIdSchema } from "../schemas/task.schemas.js";

const router = Router();


router.post('/tasks/:taskId/notes', validateParams(paramsTaskIdSchema), validateData(createNoteSchema), NoteController.create) 
router.get('/tasks/:taskId/notes', validateParams(paramsTaskIdSchema), NoteController.getNotesByTask) 
router.get('/notes/:id', validateParams(paramsIdSchema), NoteController.getNote) 
router.put('/notes/:id', validateParams(paramsIdSchema) ,validateData(updateNoteSchema), NoteController.update) 
router.delete('/notes/:id', validateParams(paramsIdSchema), NoteController.delete) 


export default router;
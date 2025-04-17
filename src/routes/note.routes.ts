import { Router } from "express";
import { NoteController } from "../controllers/note.controller";
import { validateData } from "../middlewares/validate";
import { createNoteSchema, updateNoteSchema } from "../schemas/note.schemas";
import { paramsIdSchema, paramsTaskIdSchema } from "../schemas/task.schemas";

const router = Router();


router.post('/tasks/:taskId/notes', validateData(paramsTaskIdSchema), validateData(createNoteSchema), NoteController.create) 
router.get('/tasks/:taskId/notes', validateData(paramsTaskIdSchema), NoteController.getNotesByTask) 
router.get('/notes/:id', validateData(paramsIdSchema), NoteController.getNote) 
router.put('/notes/:id', validateData(paramsIdSchema) ,validateData(updateNoteSchema), NoteController.update) 
router.delete('/notes/:id', validateData(paramsIdSchema), NoteController.delete) 


export default router;
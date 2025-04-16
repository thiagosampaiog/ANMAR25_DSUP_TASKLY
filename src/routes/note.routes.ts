import { Router } from "express";
import { NoteController } from "../controllers/note.controller";
import { validateData } from "../middlewares/validate";
import { createNoteSchema, updateNoteSchema } from "../schemas/note.schemas";

const router = Router();


router.post('/tasks/:taskId/notes',validateData(createNoteSchema), NoteController.create) 
router.get('/tasks/:taskId/notes', NoteController.getNotesByTask) 
router.get('/notes/:id', NoteController.getNote) 
router.put('/notes/:id', validateData(updateNoteSchema), NoteController.update) 
router.delete('/notes/:id', NoteController.delete) 


export default router;
import { Request, Response } from "express";
import { NoteService } from "../services/note.service";


export class NoteController {

     static async create(req: Request, res: Response) {
          try {
               const taskId = Number(req.params.taskId);
     
               const note = await NoteService.createNote(taskId, req.body);
     
               return res.status(201).json(note)
          }
           catch (error: any) {
               return res.status(400).json({ message: error.message })
          }
 }



 static async getNotesByTask(req: Request, res: Response) {
     try {
          const taskId = Number(req.params.taskId);

          const notes = await NoteService.getAllNotesByTask(taskId);

          return res.json(notes)
     }
      catch (error: any) {
          return res.status(500).json({ message: error.message })
     }
}



static async getNote(req: Request, res: Response) {
     try {
          const id = Number(req.params.id);

          const note = await NoteService.getNoteById(id);

          return res.json(note)
     }
      catch (error: any) {
          return res.status(404).json({ message: error.message })
     }
}



static async update(req: Request, res: Response) {
     try {
          const id = Number(req.params.id);

          const updatedNote = await NoteService.updateNote(id, req.body);

          return res.status(200).json(updatedNote)
     }
      catch (error: any) {
          return res.status(400).json({ message: error.message })
     }
}



static async delete(req: Request, res: Response) {
     try {
          const id = Number(req.params.id);

          await NoteService.deleteNote(id);

          return res.status(204).send();
     }
      catch (error: any) {
          return res.status(400).json({ message: error.message })
     }
}
}
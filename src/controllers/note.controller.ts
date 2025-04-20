import { Request, Response } from "express";
import { NoteService } from "../services/note.service.js";
import { getPaginationParams } from "../utils/pagination.js";

export class NoteController {
  static async create(req: Request, res: Response) {
    try {
      const taskId = parseInt(req.params.taskId);

      const note = await NoteService.createNote(taskId, req.body);

      res.status(201).json(note);
      return;
    } catch (error: any) {
      res.status(400).json({ message: error.message });
      return;
    }
  }

  static async getNotesByTask(req: Request, res: Response) {
    try {
      const taskId = parseInt(req.params.taskId);
      const { skip, take } = getPaginationParams(req.query)

      const notes = await NoteService.getAllNotesByTask(taskId, skip, take);

       res.json(notes);
       return;
    } catch (error: any) {
       res.status(500).json({ message: error.message });
       return;
    }
  }

  static async getNote(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const note = await NoteService.getNoteById(id);

       res.json(note);
       return;
    } catch (error: any) {
       res.status(404).json({ message: error.message });
       return;
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const updatedNote = await NoteService.updateNote(id, req.body);

       res.status(200).json(updatedNote);
       return;
    } catch (error: any) {
       res.status(400).json({ message: error.message });
       return;
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      await NoteService.deleteNote(id);

       res.status(204).send();
       return;
    } catch (error: any) {
       res.status(400).json({ message: error.message });
       return;
    }
  }
}

import { NoteRepository } from "../repositories/note.repository.js";
import { TaskRepository } from "../repositories/task.repository.js";
import { AppError } from "../middlewares/appError.js";

export class NoteService {
  static async createNote(taskId: number, data: { content: string }) {
    const task = await TaskRepository.findById(taskId);

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    if (!data.content || data.content.trim() === "") {
      throw new AppError("Note content is required", 400);
    }

    return NoteRepository.create(taskId, data);
  }

  static async getAllNotesByTask(taskId: number, take: number = 10, skip: number = 0 ) {
    const task = await TaskRepository.findById(taskId);

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    return NoteRepository.findAllByTask(taskId, take, skip);
  }

  static async getNoteById(id: number) {
    const note = await NoteRepository.findById(id);

    if (!note) {
      throw new AppError("Note not found", 404);
    }

    return note;
  }

  static async updateNote(id: number, data: { content: string }) {
    const note = await NoteRepository.findById(id);

    if (!note) {
      throw new AppError("Note not found", 404);
    }

    return NoteRepository.update(id, data);
  }

  static async deleteNote(id: number) {
    const note = await NoteRepository.findById(id);

    if (!note) {
      throw new AppError("Note not found", 404);
    }

    return NoteRepository.delete(id);
  }
}

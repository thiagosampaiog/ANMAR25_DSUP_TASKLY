import { NoteRepository } from "../repositories/note.repository";
import { TaskRepository } from "../repositories/task.repository";

export class NoteService {
  static async createNote(taskId: number, data: { content: string }) {
    const task = await TaskRepository.findById(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    if (!data.content || data.content.trim() === "") {
      throw new Error("Note content is required");
    }

    return NoteRepository.create(taskId, data);
  }

  static async getAllNotesByTask(taskId: number, take: number = 10, skip: number = 0 ) {
    const task = await TaskRepository.findById(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    return NoteRepository.findAllByTask(taskId, take, skip);
  }

  static async getNoteById(id: number) {
    const note = await NoteRepository.findById(id);

    if (!note) {
      throw new Error("Note not found");
    }

    return note;
  }

  static async updateNote(id: number, data: { content: string }) {
    const note = await NoteRepository.findById(id);

    if (!note) {
      throw new Error("Note not found");
    }

    return NoteRepository.update(id, data);
  }

  static async deleteNote(id: number) {
    const note = await NoteRepository.findById(id);

    if (!note) {
      throw new Error("Note not found");
    }

    return NoteRepository.delete(id);
  }
}

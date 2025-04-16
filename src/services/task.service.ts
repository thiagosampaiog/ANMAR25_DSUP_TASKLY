import { TaskRepository } from "../repositories/task.repository";
import { Status } from "@prisma/client";
import { AppError } from "../middlewares/appError";

export class TaskService {
  static async createTask(data: { title: string; description: string }) {
    if (!data.title || !data.description) {

      throw new AppError("Title and description are required", 400);

    }
    return TaskRepository.create(data);
  }

  static async getAllTasks(skip = 0, take = 10) {

    return TaskRepository.findAll(skip, take);
  }

  static async getTaskById(id: number) {

    const task = await TaskRepository.findById(id);

    if (!task) {
      throw new AppError("Task not found", 404);
    }
    return task;
  }

  static async updateTask( id: number, data: { title: string; description: string }) {

    const existingTask = await TaskRepository.findById(id);

    if (!existingTask) {
      throw new AppError("Task not found", 404);
    }

    return TaskRepository.update(id, data);
  }

  static async deleteTask(id: number) {
    const task = await TaskRepository.findById(id);

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    return TaskRepository.delete(id);
  }

  static async findTasksByStatus(status: Status, skip = 0, take = 10) {
    
    return TaskRepository.findByStatus(status as Status, skip, take);
  }
}

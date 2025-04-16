import { TaskRepository } from "../repositories/task.repository";
import { Status } from "@prisma/client";

export class TaskService {
  static async createTask(data: { title: string; description: string }) {
    if (!data.title || !data.description) {

      throw new Error("Title and description are required");

    }
    return TaskRepository.create(data);
  }

  static async getAllTasks(skip = 0, take = 10) {

    return TaskRepository.findAll(skip, take);
  }

  static async getTaskById(id: number) {

    const task = await TaskRepository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  }

  static async updateTask( id: number, data: { title: string; description: string }) {

    const existingTask = await TaskRepository.findById(id);

    if (!existingTask) {
      throw new Error("Task not found");
    }

    return TaskRepository.update(id, data);
  }

  static async deleteTask(id: number) {
    const task = await TaskRepository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    return TaskRepository.delete(id);
  }

  static async findTasksByStatus(status: Status, skip = 0, take = 10) {
    
    return TaskRepository.findByStatus(status as Status, skip, take);
  }
}

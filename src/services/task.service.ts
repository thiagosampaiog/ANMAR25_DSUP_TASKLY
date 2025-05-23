import { TaskRepository } from "../repositories/task.repository.js";
import { AppError } from "../middlewares/appError.js";
import pkg from '@prisma/client';

const { Priority, Status } = pkg;
type Prior = (typeof Priority)[keyof typeof Priority];
type Stat = (typeof Status)[keyof typeof Status];

export class TaskService {
  static async createTask(data: { title: string; description: string }) {
    if (!data.title || !data.description) {

      throw new AppError("Title and description are required", 400);

    }
    return TaskRepository.create(data);
  }

  static async getAllTasks(skip = 0, take = 10, where: any = {}) {
    
    return TaskRepository.findAll(skip, take, where);
  }

  static async getTaskById(id: number) {

    const task = await TaskRepository.findById(id);

    if (!task) {
      throw new AppError("Task not found", 404);
    }
    return task;
  }

  static async updateTask( id: number, data: { title: string; description: string;  status: Stat; priority: Prior }) {

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

  static async countAllTasks(where: any = {}) {
    return TaskRepository.countAll(where);
  } 


  static async findTasksByPriority(priority: Prior, skip = 0, take = 10) {
    return TaskRepository.findByPriority(priority as Prior, skip, take)
  }

  static async findTasksByStatus(status: Stat, skip = 0, take = 10) {
    
    return TaskRepository.findByStatus(status as Stat, skip, take);
  }
  
}

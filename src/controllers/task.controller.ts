import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

export class TaskController {
  static async create(req: Request, res: Response) {
    try {
      const task = await TaskService.createTask(req.body);
      return res.status(201).json(task);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const tasks = await TaskService.getAllTasks();
      return res.json(tasks);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const task = await TaskService.getTaskById(id);
      return res.json(task);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const UpdatedTask = await TaskService.updateTask(id, req.body);
      return res.json(UpdatedTask);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await TaskService.deleteTask(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { Status } from "@prisma/client";
import { getPaginationParams } from "../utils/pagination";

export class TaskController {
  static async create(req: Request, res: Response) {
    try {
      const task = await TaskService.createTask(req.body);
      res.status(201).json(task);
      return;
    } catch (error: any) {
      res.status(400).json({ message: error.message });
      return;
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const tasks = await TaskService.getAllTasks();
      res.json(tasks);
      return;
    } catch (error: any) {
      res.status(500).json({ message: error.message });
      return;
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const task = await TaskService.getTaskById(id);
      res.json(task);
      return;
    } catch (error: any) {
      res.status(404).json({ message: error.message });
      return;
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const UpdatedTask = await TaskService.updateTask(id, req.body);
      res.json(UpdatedTask);
      return;
    } catch (error: any) {
      res.status(400).json({ message: error.message });
      return;
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await TaskService.deleteTask(id);
      res.status(204).send();
      return;
    } catch (error: any) {
      res.status(400).json({ message: error.message });
      return;
    }
  }

  static async getTasksByStatus(req: Request, res: Response) {
    try {
      const statusParam = req.params.status;
  
      if (!Object.values(Status).includes(statusParam as Status)) {
        res.status(400).json({ message: "Status inválido" });
        return;
      }
  
      const tasks = await TaskService.findTasksByStatus(statusParam as Status);
      res.status(200).json(tasks);
      return;

    } catch (error: any) {
      res.status(400).json({ message: error.message });
      return;
    }
  }

}

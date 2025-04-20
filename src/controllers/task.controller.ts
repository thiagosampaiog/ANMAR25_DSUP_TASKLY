import { Request, Response } from "express";
import { TaskService } from "../services/task.service.js";
import { Priority, Status } from "@prisma/client";
import { getPaginationParams } from "../utils/pagination.js";


export class TaskController {
  static async create(req: Request, res: Response) {
    try {
      const task = await TaskService.createTask(req.body);
      res.status(201).json(task);
      return;
    } catch (error: any) {
      res.status(500).json({ message: error.message });
      return;
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const { skip, take } = getPaginationParams(req.query);
      const tasks = await TaskService.getAllTasks(skip, take);
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
      res.status(500).json({ message: error.message });
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
      res.status(500).json({ message: error.message });
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
      res.status(500).json({ message: error.message });
      return;
    }
  }

  static async getTasksByStatus(req: Request, res: Response) {
    try {
      const { status } = req.params;
      const { skip, take } = getPaginationParams(req.query);

      if (!Object.values(Status).includes(status as Status)) {
        res.status(500).json({ message: "Invalid Status" });
        return;
      }

      const tasks = await TaskService.findTasksByStatus(
        status as Status,
        skip,
        take
      );
      res.status(200).json(tasks);
      return;
    } catch (error: any) {
      res.status(500).json({ message: error.message });
      return;
    }
  }

  static async searchByTasksTitle(req: Request, res: Response) {
    const { q } = req.query;

    try {
      const tasks = await TaskService.searchByTitle(q as string);
      res.status(200).json(tasks);
      return;
    } catch (error: any) {
      res.status(500).json({ message: error.message });
      return;
    }
  }

  static async getTasksByPriority(req: Request<{priority: string}>, res: Response){
    try {
      const { priority } = req.params;
      const { skip, take } = getPaginationParams(req.query);
      if (!Object.values(Priority).includes(priority as Priority)){
        res.status(400).json({ message: "Invalid Priority" });
        return;
      }
      const tasks = await TaskService.findTasksByPriority(
        priority as Priority,
        skip,
        take
      );
      res.status(200).json(tasks);
      return;
    } catch (error: any) {
      res.status(500).json({ message: error.message });
      return;
    }
  }
}

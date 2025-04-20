import { Request, Response } from "express";
import { TaskService } from "../services/task.service.js";
import { getPaginationParams } from "../utils/pagination.js";
import pkg from '@prisma/client';

const { Priority, Status } = pkg;
type Prior = (typeof Priority)[keyof typeof Priority];
type Stat = (typeof Status)[keyof typeof Status];


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
      const { status, priority, title } = req.query;
  
      const whereClause: any = {};
  
      if (status && Object.values(Status).includes(status as Stat)) {
        whereClause.status = status;
      }
  
      if (priority && Object.values(Priority).includes(priority as Prior)) {
        whereClause.priority = priority;
      }
  
      if (title) {
        whereClause.title = {
          contains: title as string,
          mode: 'insensitive',
        };
      }
  
      const [tasks, totalTasks] = await Promise.all([
        TaskService.getAllTasks(skip, take, whereClause),
        TaskService.countAllTasks(whereClause),
      ]);
  
      res.json({
        data: tasks,
        currentPage: Math.floor(skip / take) + 1,
        pageSize: take,
        totalItems: totalTasks,
        totalPages: Math.ceil(totalTasks / take),
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
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

  static async getTasksByPriority(req: Request<{priority: string}>, res: Response){
    try {
      const { priority } = req.params;
      const { skip, take } = getPaginationParams(req.query);
      if (!Object.values(Priority).includes(priority as Prior)){
        res.status(400).json({ message: "Invalid Priority" });
        return;
      }
      const tasks = await TaskService.findTasksByPriority(
        priority as Prior,
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


  static async getTasksByStatus(req: Request, res: Response) {
    try {
      const { status } = req.params;
      const { skip, take } = getPaginationParams(req.query);

      if (!Object.values(Status).includes(status as Stat)) {
        res.status(500).json({ message: "Invalid Status" });
        return;
      }

      const tasks = await TaskService.findTasksByStatus(
        status as Stat,
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

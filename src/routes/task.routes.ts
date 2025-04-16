import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { validateData } from "../middlewares/validate";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schemas";

const router = Router();

router.post('/tasks', validateData(createTaskSchema), TaskController.create);
router.get('/tasks', TaskController.findAll);
router.get('/tasks/:id', TaskController.findById);

router.get('/tasks/status/:status', TaskController.getTasksByStatus);

router.put('/tasks/:id', validateData(updateTaskSchema), TaskController.update);
router.delete('/tasks/:id', TaskController.delete);

export default router;
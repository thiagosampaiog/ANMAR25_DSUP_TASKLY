import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { validateData } from "../middlewares/validate";
import { createTaskSchema, paramsIdSchema, querySchema, updateTaskSchema } from "../schemas/task.schemas";

const router = Router();

router.post('/tasks', validateData(createTaskSchema), TaskController.create);
router.get('/tasks', TaskController.findAll);
router.get('/tasks/:id', validateData(paramsIdSchema),TaskController.findById);

router.get('tasks/search', validateData(querySchema), TaskController.searchByTasksTitle);


router.get('/tasks/status/:status', TaskController.getTasksByStatus);

router.put('/tasks/:id', validateData(updateTaskSchema), validateData(paramsIdSchema), TaskController.update);
router.delete('/tasks/:id', validateData(paramsIdSchema), TaskController.delete);


export default router;
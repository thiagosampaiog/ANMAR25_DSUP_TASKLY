import { Router } from "express";
import { TaskController } from "../controllers/task.controller.js";
import { validateData, validateParams, validateQuery } from "../middlewares/validate.js";
import { createTaskSchema, paramsIdSchema, updateTaskSchema, taskQuerySchema } from "../schemas/task.schemas.js";

const router = Router();

router.post('/tasks', validateData(createTaskSchema), TaskController.create);
router.get('/tasks', validateQuery(taskQuerySchema), TaskController.findAll);
router.get('/tasks/:id', validateParams(paramsIdSchema),TaskController.findById);



router.get('/tasks/priority/:priority', validateParams(paramsIdSchema),TaskController.getTasksByPriority);
router.get('/tasks/status/:status', validateParams(paramsIdSchema),TaskController.getTasksByStatus);

router.put('/tasks/:id', validateData(updateTaskSchema), validateParams(paramsIdSchema), TaskController.update);
router.delete('/tasks/:id', validateParams(paramsIdSchema), TaskController.delete);


export default router;
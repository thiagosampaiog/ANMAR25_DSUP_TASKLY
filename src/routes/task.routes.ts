import { Router } from "express";
import { TaskController } from "../controllers/task.controller.js";
import { validateData, validateParams } from "../middlewares/validate.js";
import { createTaskSchema, paramsIdSchema, querySchema, updateTaskSchema } from "../schemas/task.schemas.js";

const router = Router();

router.post('/tasks', validateData(createTaskSchema), TaskController.create);
router.get('/tasks', TaskController.findAll);
router.get('/tasks/:id', validateParams(paramsIdSchema),TaskController.findById);



router.get('/tasks/priority/:priority', TaskController.findAll)
router.get('/tasks/status/:status', TaskController.findAll);

router.put('/tasks/:id', validateData(updateTaskSchema), validateParams(paramsIdSchema), TaskController.update);
router.delete('/tasks/:id', validateParams(paramsIdSchema), TaskController.delete);


export default router;
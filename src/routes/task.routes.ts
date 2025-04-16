import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const router = Router();

router.post('/tasks', TaskController.create);
router.get('/tasks', TaskController.findAll);
router.get('/tasks/:id', TaskController.findById);

router.get('/tasks/status/:status', TaskController.getTasksByStatus);

router.put('/tasks/:id', TaskController.update);
router.delete('/tasks/:id', TaskController.delete);

export default router;
import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getTasks, createTasks, getTask, updateTask, deleteTask } from '../controllers/tasks.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTaskSchema } from '../schemas/task.schema.js';

const router = Router();


//Obtener todas las tareas
router.get('/tasks', authRequired, getTasks);
//Obtener una tarea por id
router.get('/task/:id', authRequired, getTask);
//Crear una tarea
router.post('/tasks', authRequired, validateSchema(createTaskSchema), createTasks);;
//Eliminar una tarea
router.delete('/task/:id', authRequired, deleteTask);
//Actualizar una tarea
router.put('/task/:id', authRequired, updateTask);


export default router;
import { Router } from 'express';

import * as TodoController from '../controllers/TodoController';

const router = Router();

router.post('/todo', TodoController.create);
router.get('/todos', TodoController.readAll);

router.get('/todo/:id', TodoController.readOne);
router.put('/todo/:id', TodoController.update);
router.delete('/todo/:id', TodoController.del);



export default router;
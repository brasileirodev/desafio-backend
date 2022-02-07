import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import ensureAuhenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.get('/:id', ensureAuhenticated, usersController.find);
usersRouter.put('/:id', ensureAuhenticated, usersController.update);
usersRouter.delete('/:id', ensureAuhenticated, usersController.delete);

export default usersRouter;

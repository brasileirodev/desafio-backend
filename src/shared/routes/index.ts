import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import addressesRouter from '@modules/addresses/infra/http/routes/addresses.routes';
import ensureAuhenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/addresses', ensureAuhenticated, addressesRouter);

export default routes;

import { Router } from 'express';
import AddressesController from '../controllers/AddressesController';

const addressesRouter = Router();
const addressesController = new AddressesController();

addressesRouter.post('/', addressesController.create);
addressesRouter.delete('/:id', addressesController.delete);

export default addressesRouter;

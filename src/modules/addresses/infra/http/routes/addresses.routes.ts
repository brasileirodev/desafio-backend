import { Router } from 'express';
import AddressesController from '../controllers/AddressesController';

const addressesRouter = Router();
const addressesController = new AddressesController();

addressesRouter.post('/', addressesController.create);
addressesRouter.delete('/:id', addressesController.delete);
addressesRouter.get('/', addressesController.index);
addressesRouter.get('/:id', addressesController.find);
addressesRouter.put('/:id', addressesController.update);

export default addressesRouter;

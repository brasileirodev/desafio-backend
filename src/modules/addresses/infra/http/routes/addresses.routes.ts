import { Router } from 'express';
import AddressesController from '../controllers/AddressesController';

const addressesRouter = Router();
const addressesController = new AddressesController();

addressesRouter.post('/', addressesController.create);

export default addressesRouter;

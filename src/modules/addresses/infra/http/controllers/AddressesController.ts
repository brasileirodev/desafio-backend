import AppError from '@errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';
import CreateAddressService from '@modules/addresses/services/CreateAddressesService';
import DeleteAddressByIdService from '@modules/addresses/services/DeleteAddressByIdService';
// import CreateUserService from '@modules/users/services/CreateUserService';
// import { omit } from 'lodash';

export default class AddressesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data: ICreateAddressDTO = req.body;
    if (!data) {
      throw new AppError('Data is required');
    }
    const createAddressService = container.resolve(CreateAddressService);
    const address = await createAddressService.execute(data);

    return res.json(address);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      throw new AppError('Param address id is required');
    }

    const deleteAddressById = container.resolve(DeleteAddressByIdService);
    await deleteAddressById.execute(id);
    return res.status(204).send();
  }
}

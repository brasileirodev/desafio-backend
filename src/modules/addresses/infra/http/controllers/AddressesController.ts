import AppError from '@errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';
import CreateAddressService from '@modules/addresses/services/CreateAddressesService';
import DeleteAddressByIdService from '@modules/addresses/services/DeleteAddressByIdService';
import FindAdrressesByQueryService from '@modules/addresses/services/FindAdrressesByQueryService';
import FindAddressByIdService from '@modules/addresses/services/FindAddressByIdService';
import UpdateAddressService from '@modules/addresses/services/UpdateAddressService';

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

  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    if (!id) {
      throw new AppError('Authenticated user ID is required');
    }
    if (!req.query) {
      throw new AppError('Query is required');
    }
    const addressQueryInput:any[] = [];
    for (const key in req.query) {
      if (Object.prototype.hasOwnProperty.call(req.query, key)) {
        addressQueryInput.push({ [key]: req.query[key] });
      }
    }
    const findAdrressesByQueryService = container.resolve(FindAdrressesByQueryService);
    const addresses = await findAdrressesByQueryService.execute({ user_id: id, addressQueryInput });

    return res.status(200).json(addresses);
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      throw new AppError('Param user id is required');
    }

    const findUserById = container.resolve(FindAddressByIdService);
    const address = await findUserById.execute(id);
    return res.json(address);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      throw new AppError('Param address id is required');
    }
    if (!req.body) {
      throw new AppError('Data is required');
    }
    const dataToUpdate:any[] = [];
    for (const key in req.body) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        dataToUpdate.push({ [key]: req.body[key] });
      }
    }
    const updateAddressService = container.resolve(UpdateAddressService);
    const addresses = await updateAddressService.execute({ address_id: id, dataToUpdate });

    return res.status(200).json(addresses);
  }
}

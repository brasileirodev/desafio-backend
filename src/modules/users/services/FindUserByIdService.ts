import AppError from '@errors/AppError';
import IFindAddressResultDTO from '@modules/addresses/dtos/IFindAddressesResultDTO';
import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';
import FindAddressByUserIdService from '@modules/addresses/services/FindAddressByUserIdService';
import { container, inject, injectable } from 'tsyringe'
import validator from 'validator';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
}
interface IResponse {
  user: User;
  addresses: IFindAddressResultDTO[];
}

@injectable()
class FindUserByIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    if (!(validator.isUUID(id))) {
      throw new AppError('User id is invalid');
    }
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }
    const findAddressByUserIdService = container.resolve(FindAddressByUserIdService);
    const addresses = await findAddressByUserIdService.execute(id);
    const response: IResponse = {
      user,
      addresses,
    };
    return response;
  }
}

export default FindUserByIdService;

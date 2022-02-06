import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import validator from 'validator';
import IAddressesRepository from '../repositories/IAddressesRepository';
import IFindAddressResultDTO from '../dtos/IFindAddressesResultDTO';

@injectable()
class FindAddressByUserIdService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<IFindAddressResultDTO[]> {
    if (!(validator.isUUID(user_id))) {
      throw new AppError('User id is invalid');
    }
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('The user id does not exists');
    }

    const addresses = await this.addressesRepository.findAddressByUserId(user_id);

    const addressesOmitSameValue = addresses.map(({
      id, complement_address, address, city, state, country, created_at, updated_at,
    }) => ({
      id, complement_address, address, city, state, country, created_at, updated_at,
    }));

    return addressesOmitSameValue;
  }
}
export default FindAddressByUserIdService;

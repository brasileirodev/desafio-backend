import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import validator from 'validator';
import ICreateAddressDTO from '../dtos/ICreateAddressDTO';
import IAddressesRepository from '../repositories/IAddressesRepository';
import Address from '../infra/typeorm/entities/Address';

@injectable()
class CreateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: ICreateAddressDTO): Promise<Address> {
    if (!(validator.isUUID(data.user_id))) {
      throw new AppError('A user id valid is required');
    }
    const userExists = await this.usersRepository.findById(data.user_id);

    if (!userExists) {
      throw new AppError('The user id does not exists');
    }

    const address = await this.addressesRepository.create(data);
    await this.addressesRepository.save(address);

    return address;
  }
}
export default CreateAddressService;

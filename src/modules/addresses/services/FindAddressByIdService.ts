import AppError from '@errors/AppError';
import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';
import { inject, injectable } from 'tsyringe'
import validator from 'validator';
import Address from '../infra/typeorm/entities/Address';

@injectable()
class FindAddressByIdService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(id: string): Promise<Address> {
    if (!(validator.isUUID(id))) {
      throw new AppError('Address id is invalid');
    }
    const address = await this.addressesRepository.findById(id);

    if (!address) {
      throw new AppError('Address not found');
    }

    return address;
  }
}

export default FindAddressByIdService;

import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import validator from 'validator';
import IAddressesRepository from '../repositories/IAddressesRepository';
import Address from '../infra/typeorm/entities/Address';
import IUpdateAddressServiceDTO from '../dtos/IUpdateAddressServiceDTO';

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(
    { address_id, dataToUpdate }: IUpdateAddressServiceDTO,
  ): Promise<Address> {
    if (!(validator.isUUID(address_id))) {
      throw new AppError('Address ID is invalid');
    }
    const validKeysToUpdate = ['country', 'state', 'city', 'address', 'complement_address'];

    const inputValidator = (input: any): Address => {
      const addressDataToUpdate = new Address();
      input.forEach((item:Object) => {
        if (validKeysToUpdate.includes(Object.keys(item)[0])) {
          Object.assign(addressDataToUpdate, { ...item });
        }
      });
      return addressDataToUpdate;
    }
    const validatedDataToUpdate = inputValidator(dataToUpdate);

    const address = await this.addressesRepository.findById(address_id);

    if (!address) {
      throw new AppError('Address not found');
    }
    console.log(address)
    Object.assign(address, { ...validatedDataToUpdate });
    console.log(address)
    const updatedAddress = await this.addressesRepository.save(address);

    return updatedAddress;
  }
}
export default UpdateAddressService;

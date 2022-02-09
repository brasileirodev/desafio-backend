import AppError from '@errors/AppError';
import { inject, injectable } from 'tsyringe'
import validator from 'validator';
import IAddressesRepository from '../repositories/IAddressesRepository';

@injectable()
class DeleteUserByIdService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    if (!(validator.isUUID(id))) {
      throw new AppError('User id is invalid');
    }
    const addressExist = await this.addressesRepository.findById(id);
    if (!addressExist) {
      throw new AppError('Address ID not found');
    }
    this.addressesRepository.delete(addressExist.id);
  }
}
export default DeleteUserByIdService;

import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import validator from 'validator';
import IAddressesRepository from '../repositories/IAddressesRepository';
import IFindAddressResultDTO from '../dtos/IFindAddressesResultDTO';
import Address from '../infra/typeorm/entities/Address';
import IFindAdrressesByQueryParamsDTO from '../dtos/IFindAdrressByQueryParamsDTO';

@injectable()
class FindAdrressesByQueryService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    { user_id, addressQueryInput }: IFindAdrressesByQueryParamsDTO,
  ): Promise<IFindAddressResultDTO[]> {
    if (!(validator.isUUID(user_id))) {
      throw new AppError('User id is invalid');
    }
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('The user id does not exists');
    }
    const validKeysQueryParams = ['country', 'state', 'city', 'address', 'complement_address'];

    const inputValidator = (input: any): Address => {
      const addressParams = new Address();
      input.forEach((item:Object) => {
        if (validKeysQueryParams.includes(Object.keys(item)[0])) {
          Object.assign(addressParams, { ...item });
        }
      });
      return addressParams;
    }
    const inputValidated = inputValidator(addressQueryInput);
    const queryParams: Address = {
      ...inputValidated,
      user_id,
    };
    const resultQueryIndex = await this.addressesRepository.indexByQuery(queryParams);

    const addressesOmitSameValue = resultQueryIndex.map(({
      id, complement_address, address, city, state, country, created_at, updated_at,
    }) => ({
      id, complement_address, address, city, state, country, created_at, updated_at,
    }));

    return addressesOmitSameValue;
  }
}
export default FindAdrressesByQueryService;

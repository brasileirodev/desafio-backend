import Address from '@modules/addresses/infra/typeorm/entities/Address';
import ICreateAddressDTO from '../dtos/ICreateAddressDTO';

export default interface IAddressesRepository {
  create(data: ICreateAddressDTO): Promise<Address>;
  save(address: Address): Promise<Address>;
  findById(user_id: string): Promise<Address[]>;
}

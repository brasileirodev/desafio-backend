import Address from '@modules/addresses/infra/typeorm/entities/Address';
import ICreateAddressDTO from '../dtos/ICreateAddressDTO';

export default interface IAddressesRepository {
  create(data: ICreateAddressDTO): Promise<Address>;
  save(address: Address): Promise<Address>;
  findAddressByUserId(user_id: string): Promise<Address[]>;
  findById(address_id: string): Promise<Address | undefined>;
  delete(id: string): Promise<void>;
}

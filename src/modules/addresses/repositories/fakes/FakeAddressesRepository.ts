import { v4 } from 'uuid';
import Address from '@modules/addresses/infra/typeorm/entities/Address';
import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';
import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';

class AddresssRepository implements IAddressesRepository {
  private addresses: Address[] = [];

  public async create(data: ICreateAddressDTO): Promise<Address> {
    const address = new Address();
    Object.assign(address, data, { id: v4(), user_id: v4() });
    return address;
  }

  public async save(address: Address): Promise<Address> {
    this.addresses.push(address);
    return address;
  }
}
export default AddresssRepository;

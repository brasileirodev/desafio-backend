import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';
import Address from '@modules/addresses/infra/typeorm/entities/Address';
import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';
import { getRepository, Repository } from 'typeorm';

class AddressesRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create(data: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create(data);

    return address;
  }

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address);
  }

  // public async findAll(): Promise<Address[]> {
  //   const appointments = await this.ormRepository.find();

  //   return appointments;
  // }
}

export default AddressesRepository;

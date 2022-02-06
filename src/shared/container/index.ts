import { container } from 'tsyringe';

import IUsersRepositoy from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';
import AddressesRepository from '@modules/addresses/infra/typeorm/repositories/AddressesRepository';

container.registerSingleton<IUsersRepositoy>('UsersRepository', UsersRepository);
container.registerSingleton<IAddressesRepository>('AddressesRepository', AddressesRepository);

import { container } from 'tsyringe';

import IUsersRepositoy from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersRepositoy>('UsersRepository', UsersRepository);

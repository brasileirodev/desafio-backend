import AppError from '@errors/AppError';
import { omit } from 'lodash';
import { inject, injectable } from 'tsyringe'
import validator from 'validator';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class UpdateUserByIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: IUpdateUserDTO): Promise<User> {
    if (!(validator.isUUID(data.id))) {
      throw new AppError('User id is invalid');
    }

    const user = await this.usersRepository.findById(data.id);
    if (!user) {
      throw new AppError('User not found');
    }
    const dataToUpdate = omit(data, ['id']);
    console.log({ dataToUpdate, user })
    Object.assign(user, { ...dataToUpdate });
    console.log(user);
    const updatedUser = await this.usersRepository.save(user);

    return updatedUser;
  }
}
export default UpdateUserByIdService;

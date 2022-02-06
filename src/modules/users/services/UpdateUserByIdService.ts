import AppError from '@errors/AppError';
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

  public async execute({
    id, email, name, password,
  }: IUpdateUserDTO): Promise<User> {
    if (!(validator.isUUID(id))) {
      throw new AppError('User id is invalid');
    }

    const updatedUser = await this.usersRepository.update({
      id,
      email,
      name,
      password,
    });

    return updatedUser;
  }
}
export default UpdateUserByIdService;

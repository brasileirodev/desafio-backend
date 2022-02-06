import AppError from '@errors/AppError';
import { inject, injectable } from 'tsyringe'
import validator from 'validator';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class DeleteUserByIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    if (!(validator.isUUID(id))) {
      throw new AppError('User id is invalid');
    }
    const userExist = await this.usersRepository.findById(id);
    if (!userExist) {
      throw new AppError('User not found');
    }
    this.usersRepository.delete(userExist.id);
  }
}
export default DeleteUserByIdService;

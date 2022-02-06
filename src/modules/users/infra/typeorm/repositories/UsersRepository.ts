import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getConnection, getRepository, Repository } from 'typeorm';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { id },
    });

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email },
    });

    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const createdUser = this.ormRepository.create(userData);
    return createdUser;
  }

  public save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async update({
    id, email, name, password,
  }: IUpdateUserDTO): Promise<User> {
    const userToUpdate = await this.ormRepository.findOne({
      where: { id },
    });
    if (!userToUpdate) {
      throw new Error('User not found');
    }
    if (email) {
      Object.assign(userToUpdate, { email });
    }
    if (name) {
      Object.assign(userToUpdate, { name });
    }
    if (password) {
      Object.assign(userToUpdate, { password });
    }

    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set(userToUpdate)
      .where('id = :id', { id })
      .execute();
    return userToUpdate;
  }

  public async delete(id: string): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
  }
}

export default UsersRepository;

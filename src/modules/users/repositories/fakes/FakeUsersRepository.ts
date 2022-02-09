import { v4 } from 'uuid';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((findUser) => findUser.id === id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((findUser) => findUser.email === email);
    return user;
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, {
      id: v4(), name, email, password,
    });
    return user;
  }

  public async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  public async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }

  public async update(data: IUpdateUserDTO): Promise<User> {
    const user = await this.findById(data.id);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, { ...data });
    return user;
  }
}
export default UsersRepository;

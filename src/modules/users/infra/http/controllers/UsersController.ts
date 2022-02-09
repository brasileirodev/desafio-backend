import AppError from '@errors/AppError';
import FindUserByIdService from '@modules/users/services/FindUserByIdService';
import CreateUserService from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { omit } from 'lodash';
import { container } from 'tsyringe';
import UpdateUserByIdService from '@modules/users/services/UpdateUserByIdService';
import DeleteUserByIdService from '@modules/users/services/DeleteUserByIdService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new AppError('Missing required fields', 400);
    }
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ name, email, password });
    return res.json(omit(user, 'password'));
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      throw new AppError('Param user id is required');
    }

    const findUserById = container.resolve(FindUserByIdService);
    const response = await findUserById.execute({ id });
    return res.json(omit(response, 'user.password'));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!id) {
      throw new AppError('Param user id is required');
    }
    if (!name && !email) {
      throw new AppError('No value to update');
    }

    const updateUserById = container.resolve(UpdateUserByIdService);
    const userUpdated = await updateUserById.execute({
      id, name, email,
    });
    return res.json(omit(userUpdated, 'password'));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      throw new AppError('Param user id is required');
    }

    const deleteUserById = container.resolve(DeleteUserByIdService);
    await deleteUserById.execute(id);
    return res.status(204).send();
  }
}

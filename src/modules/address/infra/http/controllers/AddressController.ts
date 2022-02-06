import AppError from '@errors/AppError';
import { Request, Response } from 'express';

// import CreateUserService from '@modules/users/services/CreateUserService';
// import { omit } from 'lodash';
// import { container } from 'tsyringe';

export default class AddressController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    if (!data) {
      throw new AppError('Body is empty', 400);
    }
    return res.json(data);
  }
}

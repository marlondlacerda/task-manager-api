import { Request, Response } from 'express';
import { LoginUser, RegisterUser } from '@domain/usecases/auth';
import { UserRepository } from '@domain/repositories';
import { TokenService } from '@shared/auth';
import { HttpHelper } from '@presentation/helpers';

export class AuthController {
  constructor(private readonly userRepository: UserRepository) {}

  register = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password } = req.body;
    const registerUser = new RegisterUser(this.userRepository);
    const user = await registerUser.execute({ name, email, password });
    const token = TokenService.generate(user);

    const { password: _, ...userWithoutPassword } = user;

    return HttpHelper.created(res, {
      user: userWithoutPassword,
      token,
    });
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const loginUser = new LoginUser(this.userRepository);
    const user = await loginUser.execute({ email, password });

    const token = TokenService.generate(user);

    return HttpHelper.success(res, {
      token,
    });
  };
}

import { AuthController } from '@presentation/controllers/auth-controller';
import { TokenService } from '@shared/auth/token-service';

jest.spyOn(TokenService, 'generate').mockReturnValue('abc');
jest.mock('bcryptjs', () => ({ compare: jest.fn().mockResolvedValue(true) }));

describe('AuthController', () => {
  it('login com dados válidos retorna 200 e body', async () => {
    const fakeUser = {
      id: '123',
      name: 'User',
      email: 'x',
      password: 'hashed',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const fakeUserRepository = { findByEmail: jest.fn().mockResolvedValue(fakeUser) };
    const controller = new AuthController(fakeUserRepository as any);
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await controller.login({ body: { email: 'x', password: 'y' } } as any, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: { token: 'abc' } });
    expect(fakeUserRepository.findByEmail).toHaveBeenCalledWith('x');
  });
});

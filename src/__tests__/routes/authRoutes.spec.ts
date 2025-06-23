/* eslint-disable */
import app from '@main/server';
import request from 'supertest';

// Mock dos factories para não usar Prisma
jest.mock('@main/factories/auth-controller-factory', () => ({
  makeAuthController: () => ({
    register: async (_req: any, res: any) => res.status(201).json({ user: { id: '1', name: 'foo', email: 'foo@bar.com' }, token: 'abc' }),
    login: async (_req: any, res: any) => res.status(200).json({ token: 'abc' }),
  }),
  makeTaskController: () => ({
    create: jest.fn(),
    findAllByUser: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }),
}));

describe('Rotas de Auth', () => {
  it('POST /auth/register deve retornar token', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ name: 'foo', email: 'foo@bar.com', password: 'Password123@' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('token');
  });
  it('POST /auth/login deve retornar token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'foo@bar.com', password: 'Password123@' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});

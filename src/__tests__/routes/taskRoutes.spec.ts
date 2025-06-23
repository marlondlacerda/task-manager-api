/* eslint-disable */
import app from '@main/server';
import request from 'supertest';

// Bypass authMiddleware
jest.mock('@main/middleware/auth-middleware', () => ({
  authMiddleware: (_req: any, _res: any, next: any) => next(),
}));

// Mock dos factories para não usar Prisma
jest.mock('@main/factories', () => ({
  makeAuthController: () => ({}),
  makeTaskController: () => ({
    create: async (_req: any, res: any) =>
      res
        .status(201)
        .json({
          id: '1',
          title: 'Task1',
          description: 'desc',
          dueDate: '2025-01-01T00:00:00.000Z',
          status: 'PENDING',
        }),
    findAllByUser: async (_req: any, res: any) =>
      res
        .status(200)
        .json([
          {
            id: '1',
            title: 'Task1',
            description: 'desc',
            dueDate: '2025-01-01T00:00:00.000Z',
            status: 'PENDING',
          },
        ]),
    findById: async (_req: any, res: any) =>
      res
        .status(200)
        .json({
          id: '1',
          title: 'Task1',
          description: 'desc',
          dueDate: '2025-01-01T00:00:00.000Z',
          status: 'PENDING',
        }),
    update: async (_req: any, res: any) =>
      res
        .status(200)
        .json({
          id: '1',
          title: 'Task1',
          description: 'desc',
          dueDate: '2025-01-01T00:00:00.000Z',
          status: 'COMPLETED',
        }),
    delete: async (_req: any, res: any) => res.status(204).send(),
  }),
}));

describe('Rotas de Tasks', () => {
  it('POST /tasks deve criar uma task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Task1', description: 'desc', dueDate: '2025-01-01T00:00:00.000Z' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id', '1');
    expect(res.body).toHaveProperty('title', 'Task1');
  });

  it('GET /tasks deve retornar array de tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /tasks/:id deve retornar uma task', async () => {
    const res = await request(app).get('/tasks/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', '1');
  });

  it('PUT /tasks/:id deve atualizar a task', async () => {
    const res = await request(app)
      .put('/tasks/1')
      .send({
        title: 'Task1',
        description: 'desc',
        dueDate: '2025-01-01T00:00:00.000Z',
        status: 'COMPLETED',
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'COMPLETED');
  });

  it('DELETE /tasks/:id deve retornar 204', async () => {
    const res = await request(app).delete('/tasks/1');
    expect(res.status).toBe(204);
  });
});

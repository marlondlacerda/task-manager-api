import { z } from 'zod';

export const taskSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Título é obrigatório'),
    description: z.string().optional(),
    dueDate: z
      .string()
      .optional()
      .refine((date) => !date || !isNaN(Date.parse(date)), {
        message: 'Data inválida',
      }),
  }),
});

export interface CreateTaskInput {
  title: string;
  dueDate: Date;
  description?: string;
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

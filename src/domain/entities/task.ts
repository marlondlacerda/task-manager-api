export type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  dueDate: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

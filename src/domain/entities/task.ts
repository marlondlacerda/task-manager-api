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

export interface FindAllTasksParams {
  userId: string;
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  orderBy?: 'dueDate' | 'createdAt';
  orderDirection?: 'asc' | 'desc';
}

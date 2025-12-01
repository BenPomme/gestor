// Task types based on SPEC2.md

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  userId: string;
  dependentId?: string;
  processId?: string;
  documentId?: string;
  title: string;
  description?: string;
  dueDate?: Date;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  completedAt?: Date;
}

export interface CreateTaskDto {
  dependentId?: string;
  processId?: string;
  documentId?: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: TaskPriority;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  dueDate?: Date;
  status?: TaskStatus;
  priority?: TaskPriority;
}

export interface TaskFilter {
  status?: TaskStatus;
  priority?: TaskPriority;
  dependentId?: string;
  processId?: string;
  dueBefore?: Date;
  dueAfter?: Date;
}

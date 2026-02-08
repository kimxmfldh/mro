export type UserRole = 'admin' | 'staff' | 'viewer';
export type TaskCycle = '매일' | '매주' | '매월' | '분기' | '반기' | '연간' | '수시';
export type TaskPriority = '높음' | '보통' | '낮음';
export type TaskStatus = 'completed' | 'pending' | 'overdue';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  color: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Task {
  id: number;
  companyId: number;
  categoryId: number;
  title: string;
  assigneeId: number;
  cycle: TaskCycle;
  priority: TaskPriority;
  dueDate: string; // ISO date string
  isChecked: boolean;
  checkedAt?: string;
  checkedBy?: number;
  notes?: string;
}

export interface Activity {
  id: number;
  action: string;
  userName: string;
  taskTitle: string;
  timestamp: string;
}

export interface Company {
  id: number;
  name: string;
  code: string;
  industry: string;
  isActive: boolean;
}

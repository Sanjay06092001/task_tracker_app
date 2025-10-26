export interface User {
  id: string;
  email: string;
  passwordHash: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

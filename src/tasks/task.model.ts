import { TaskStatus } from './task.enum';

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export { Task };

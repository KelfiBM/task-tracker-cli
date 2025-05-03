import { TaskStatus } from './task-status.enum';

export class Task {
  id!: number;
  description!: string;
  status!: TaskStatus;
  createdAt!: Date;
  updatedAt!: Date;
}

import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async addTask(description: string): Promise<number> {
    const task = new Task();
    task.description = description;
    task.status = TaskStatus.ToDo;
    return await this.taskRepository.addTask(task);
  }

  async updateTask(id: number, description: string): Promise<void> {
    return await this.taskRepository.updateTask(id, { description });
  }

  async deleteTask(id: number): Promise<void> {
    return await this.taskRepository.deleteTask(id);
  }

  async setInProgress(id: number): Promise<void> {
    return await this.taskRepository.updateTask(id, {
      status: TaskStatus.InProgress,
    });
  }

  async setDone(id: number): Promise<void> {
    return await this.taskRepository.updateTask(id, {
      status: TaskStatus.Done,
    });
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.getAllTasks();
  }

  async getTasksByStatus(status: TaskStatus): Promise<Task[]> {
    return await this.taskRepository.getAllTasks({ status });
  }
}

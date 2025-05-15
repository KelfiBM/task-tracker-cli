import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async addTask(description: string): Promise<number> {
    const task = new Task();
    task.description = description;
    task.status = TaskStatus.Todo;
    return await this.taskRepository.addTask(task);
  }

  async updateTask(id: number, description: string): Promise<void> {
    return await this.taskRepository.updateTask(id, { description });
  }

  async deleteTask(id: number): Promise<void> {
    return await this.taskRepository.deleteTask(id);
  }

  async updateStatus(id: number, status: TaskStatus) {
    return await this.taskRepository.updateTask(id, {
      status: status,
    });
  }

  async getTasks(): Promise<Task[]> {
    return await this.taskRepository.getAllTasks();
  }

  async getTasksByStatus(status: TaskStatus): Promise<Task[]> {
    return await this.taskRepository.getAllTasks({ status });
  }

  async getTaskById(id: number): Promise<Task> {
    return await this.taskRepository.getTaskById(id);
  }
}

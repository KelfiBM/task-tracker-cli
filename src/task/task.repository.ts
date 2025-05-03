import { Task } from './task.entity';
import { SourceDriver } from '../utils/source-driver';

const sourceName = 'Task';

export class TaskRepository {
  async addTask(task: Task): Promise<number> {
    const tasks = await SourceDriver.read<Task>(sourceName);
    const newId = await SourceDriver.generateId(sourceName);
    task.id = newId;
    task.createdAt = new Date();
    tasks.push(task);
    SourceDriver.update(sourceName, tasks);
    return newId;
  }

  async deleteTask(id: number): Promise<void> {
    const tasks = await SourceDriver.read<Task>(sourceName);
    const updatedTasks = tasks.filter((task) => task.id !== id);
    SourceDriver.update(sourceName, updatedTasks);
  }

  async updateTask(id: number, taskPartial: Partial<Task>) {
    const tasks = await SourceDriver.read<Task>(sourceName);
    const taskIndex = tasks.findIndex((task) => id === task.id);

    if (taskIndex === -1) {
      throw new Error(`Task with id ${id} not found`);
    }

    const currentTask = tasks[taskIndex];

    currentTask.description =
      taskPartial.description || currentTask.description;
    currentTask.status = taskPartial.status || currentTask.status;

    currentTask.updatedAt = new Date();

    tasks[taskIndex] = currentTask;

    await SourceDriver.update(sourceName, tasks);
  }

  async getTaskById(id: number): Promise<Task> {
    const tasks = await SourceDriver.read<Task>(sourceName);
    const taskIndex = tasks.findIndex((task) => id === task.id);

    if (taskIndex === -1) {
      throw new Error(`Task with id ${id} not found`);
    }

    return tasks[taskIndex];
  }

  async getAllTasks(filter?: Partial<Task>): Promise<Task[]> {
    const tasks = await SourceDriver.read<Task>(sourceName);
    if (!filter) {
      return tasks;
    }
    return tasks.filter((task) => {
      const statusMatch = filter.status ? task.status === filter.status : true;
      const descriptionMatch = filter.description
        ? task.description.includes(filter.description)
        : true;
      return statusMatch && descriptionMatch;
    });
  }
}

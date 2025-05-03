import { Command } from '../core/command';
import { Task } from '../task/task.entity';
import { TaskStatus } from '../task/task-status.enum';
import { TaskService } from '../task/task.service';
import { ArgumentException } from '../errors/argument.exception';

export class ListCommand implements Command {
  constructor(private readonly taskService: TaskService) {}
  name: string = 'list';
  description: string = 'list [done|todo|in-progress]';

  async run(args: string[]): Promise<void> {
    const status = args.shift()?.toLowerCase();

    let tasks: Task[];

    if (!status) {
      tasks = await this.taskService.getAllTasks();
    } else if ((Object.values(TaskStatus) as string[]).includes(status)) {
      const taskStatus = status as TaskStatus;
      tasks = await this.taskService.getTasksByStatus(taskStatus);
    } else {
      throw new ArgumentException('[done|todo|in-progress]');
    }

    if (tasks.length == 0) {
      console.log('No task available with the current criteria');
      return;
    }

    console.log('Id\tStatus\tDescription');
    for (const task of tasks) {
      console.log(`${task.id}\t${task.status}\t${task.description}`);
    }
  }
}

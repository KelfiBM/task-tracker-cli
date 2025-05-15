import { Command } from '../core/command';
import { Task } from '../task/task.entity';
import { TaskStatus } from '../task/task-status.enum';
import { TaskService } from '../task/task.service';
import { Validator } from '../validation/validator';

export class ListCommand implements Command {
  constructor(
    private readonly taskService: TaskService,
    private readonly validator: Validator
  ) {}
  name: string = 'list';
  description: string = 'list [done|todo|in-progress]';

  async run(args: string[]): Promise<void> {
    const status = args.shift()?.toLowerCase();

    this.validator
      .validate(status, '[status]')
      .isOptional()
      .isEnum(TaskStatus)
      .run();

    let tasks: Task[];

    if (!status) {
      tasks = await this.taskService.getTasks();
    } else {
      tasks = await this.taskService.getTasksByStatus(status as TaskStatus);
    }

    if (tasks.length == 0) {
      console.log('No task available with the current criteria');
      return;
    }

    console.log('Id\tStatus\t\tDescription');
    for (const task of tasks) {
      console.log(`${task.id}\t${task.status}\t\t${task.description}`);
    }
  }
}

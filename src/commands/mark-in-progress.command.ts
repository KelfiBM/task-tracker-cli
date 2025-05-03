import { Command } from '../core/command';
import { ArgumentException } from '../errors/argument.exception';
import { MissingArgumentException } from '../errors/missing-argument.exception';
import { TaskStatus } from '../task/task-status.enum';
import { TaskService } from '../task/task.service';

export class MarkInProgressCommand implements Command {
  constructor(private readonly taskService: TaskService) {}
  name: string = 'mark-in-progress';
  description: string = 'mark-in-progress <id>';

  async run(args: string[]): Promise<void> {
    const id = args.shift();

    if (!id) {
      throw new MissingArgumentException('<id>');
    }

    if (!Number.isInteger(id)) {
      throw new ArgumentException('<id>', 'Integer must be provided');
    }

    await this.taskService.updateStatus(Number(id), TaskStatus.InProgress);
  }
}

import { Command } from '../core/command';
import { ArgumentException } from '../errors/argument.exception';
import { MissingArgumentException } from '../errors/missing-argument.exception';
import { TaskService } from '../task/task.service';

export class UpdateCommand implements Command {
  constructor(private readonly taskService: TaskService) {}
  name: string = 'update';
  description: string = 'update <id> <description>';

  async run(args: string[]): Promise<void> {
    const id = args.shift();

    if (!id) {
      throw new MissingArgumentException('<id>');
    }

    if (!Number.isInteger(id)) {
      throw new ArgumentException('<id>', 'Integer must be provided');
    }

    const description = args.join(' ');
    if (!description) {
      throw new MissingArgumentException('<description>');
    }

    await this.taskService.updateTask(Number(id), description);
  }
}

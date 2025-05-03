import { Command } from '../core/command';
import { MissingArgumentException } from '../errors/missing-argument.exception';
import { TaskService } from '../task/task.service';

export class AddCommand implements Command {
  constructor(private readonly taskService: TaskService) {}
  name: string = 'add';
  description: string = 'add <description>';

  async run(args: string[]): Promise<void> {
    const description = args.slice().join(' ');
    if (!description) {
      throw new MissingArgumentException('<description>');
    }

    const id = await this.taskService.addTask(description);
    console.log(`Task added with ID: ${id}`);
  }
}

import { Command } from '../core/command';
import { TaskService } from '../task/task.service';
import { Validator } from '../validation/validator';

export class AddCommand implements Command {
  constructor(
    private readonly taskService: TaskService,
    private readonly validator: Validator
  ) {}
  name: string = 'add';
  description: string = 'add <description>';

  async run(args: string[]): Promise<void> {
    const description = args.slice().join(' ');

    this.validator
      .validate(description, '<description>')
      .isNotEmpty()
      .isString()
      .run();

    const id = await this.taskService.addTask(description);
    console.log(`Task added with ID: ${id}`);
  }
}

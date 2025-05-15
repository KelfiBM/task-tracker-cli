import { Command } from '../core/command';
import { TaskService } from '../task/task.service';
import { Validator } from '../validation/validator';

export class UpdateCommand implements Command {
  constructor(
    private readonly taskService: TaskService,
    private readonly validator: Validator
  ) {}
  name: string = 'update';
  description: string = 'update <id> <description>';

  async run(args: string[]): Promise<void> {
    const id = args.shift();
    const description = args.join(' ');

    this.validator.validate(id, '<id>').isNotEmpty().isInteger();
    this.validator
      .validate(description, '<description>')
      .isNotEmpty()
      .isString()
      .run();

    await this.taskService.updateTask(Number(id), description);
  }
}

import { Command } from '../core/command';
import { TaskService } from '../task/task.service';
import { Validator } from '../validation/validator';

export class DeleteCommand implements Command {
  constructor(
    private readonly taskService: TaskService,
    private readonly validator: Validator
  ) {}
  name: string = 'delete';
  description: string = 'delete <id>';

  async run(args: string[]): Promise<void> {
    const id = args.shift();

    this.validator.validate(id, '<id>').isNotEmpty().isInteger().run();

    await this.taskService.deleteTask(Number(id));
  }
}

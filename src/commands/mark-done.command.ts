import { Command } from '../core/command';
import { TaskStatus } from '../task/task-status.enum';
import { TaskService } from '../task/task.service';
import { Validator } from '../validation/validator';

export class MarkDoneCommand implements Command {
  constructor(
    private readonly taskService: TaskService,
    private readonly validator: Validator
  ) {}
  name: string = 'mark-done';
  description: string = 'mark-done <id>';

  async run(args: string[]): Promise<void> {
    const id = args.shift();

    this.validator.validate(id, '<id>').isNotEmpty().isInteger().run();

    await this.taskService.updateStatus(Number(id), TaskStatus.Done);
  }
}

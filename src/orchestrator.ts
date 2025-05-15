import { TaskService } from './task/task.service';
import {
  AddCommand,
  DeleteCommand,
  HelpCommand,
  ListCommand,
  MarkDoneCommand,
  MarkInProgressCommand,
  UpdateCommand,
} from './commands/commands';
import { Command } from './core/command';
import { Validator } from './validation/validator';

export class Orchestrator {
  defaultCommand: Command;
  availableCommands: Command[];

  constructor(private taskService: TaskService, private validator: Validator) {
    this.defaultCommand = new HelpCommand(() => this.availableCommands);
    this.availableCommands = [
      this.defaultCommand,
      new AddCommand(this.taskService, this.validator),
      new UpdateCommand(this.taskService, this.validator),
      new DeleteCommand(this.taskService, this.validator),
      new MarkInProgressCommand(this.taskService, this.validator),
      new MarkDoneCommand(this.taskService, this.validator),
      new ListCommand(this.taskService, this.validator),
    ];
  }

  async runCommand(args: string[]) {
    const commandName = args.shift() || this.defaultCommand.name;

    const command = this.availableCommands.find(
      (command) => command.name === commandName
    );

    if (!command) {
      console.error(`Unknown command: ${commandName}`);
      console.log(
        `To see a list of supported commands run: \n ${this.defaultCommand.description}`
      );
      return;
    }

    try {
      await command.run(args);
    } catch (error: any) {
      console.error(error.message ?? error);
    }
  }
}

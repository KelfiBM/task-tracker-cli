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

export class Orchestrator {
  defaultCommand: Command;
  availableCommands: Command[];

  constructor(private taskService: TaskService) {
    this.defaultCommand = new HelpCommand(() => this.availableCommands);
    this.availableCommands = [
      this.defaultCommand,
      new AddCommand(this.taskService),
      new UpdateCommand(this.taskService),
      new DeleteCommand(this.taskService),
      new MarkInProgressCommand(this.taskService),
      new MarkDoneCommand(this.taskService),
      new ListCommand(this.taskService),
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
    } catch (error) {
      console.error(error);
    }
  }
}

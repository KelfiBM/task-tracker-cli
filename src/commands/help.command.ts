import { Command } from '../core/command';

export class HelpCommand implements Command {
  constructor(private readonly availableCommands: Command[]) {}
  name: string = 'help';
  description: string = 'help';

  async run(_args: string[]): Promise<void> {
    console.log('Supported commands:');

    for (let command of this.availableCommands) {
      console.log(command.description);
    }
    console.log(this.description);
  }
}

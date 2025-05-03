import { Command } from '../core/command';

export class HelpCommand implements Command {
  constructor(private readonly availableCommands: () => Command[]) {}
  name: string = 'help';
  description: string = 'help';

  async run(_args: string[]): Promise<void> {
    const availableCommands = this.availableCommands();

    if (availableCommands.length == 0) {
      console.log('There are not commands available');
    }

    console.log('Supported commands:');

    for (let command of availableCommands) {
      console.log(command.description);
    }
  }
}

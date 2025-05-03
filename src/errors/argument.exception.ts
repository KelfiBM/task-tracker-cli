export class ArgumentException extends Error {
  constructor(argumentName: string, customMessage?: string, ...params: any) {
    const message = `Unexpected value for argument: ${argumentName}${
      customMessage ? '\n' + customMessage : ''
    }`;
    super(message, params);
    this.name = 'ArgumentException';
  }
}

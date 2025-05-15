export class ArgumentException extends Error {
  constructor(parameterName: string, customMessage?: string, ...params: any) {
    const message = `Unexpected argument: ${parameterName}${
      customMessage ? '\n' + customMessage : ''
    }`;
    super(message, params);
    this.name = 'ArgumentException';
  }
}

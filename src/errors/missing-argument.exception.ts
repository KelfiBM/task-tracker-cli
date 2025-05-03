import { ArgumentException } from './argument.exception';

export class MissingArgumentException extends ArgumentException {
  constructor(argumentName: string, ...params: any) {
    super(argumentName, 'Value is missing', params);
    this.name = 'MissingArgumentException';
  }
}

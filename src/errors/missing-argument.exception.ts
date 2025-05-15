import { ArgumentException } from './argument.exception';

export class MissingArgumentException extends ArgumentException {
  constructor(parameterName: string, ...params: any) {
    super(parameterName, 'Value is missing', params);
    this.name = 'MissingArgumentException';
  }
}

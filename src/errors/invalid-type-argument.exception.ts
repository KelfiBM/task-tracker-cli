import { ArgumentException } from './argument.exception';

export class InvalidTypeArgumentException extends ArgumentException {
  constructor(parameterName: string, expectedType: string, ...params: any) {
    super(
      parameterName,
      `Invalid argument type. Expected type: '${expectedType}'`,
      params
    );
    this.name = 'InvalidTypeArgumentException';
  }
}

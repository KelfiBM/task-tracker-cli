import { Validation } from './validation';

export class Validator {
  validate(value: any, parameterName: string): Validation {
    const validation = new Validation(value, parameterName);
    return validation;
  }
}

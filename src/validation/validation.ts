import { InvalidTypeArgumentException } from '../errors/invalid-type-argument.exception';
import { MissingArgumentException } from '../errors/missing-argument.exception';
import { ArgumentException } from '../errors/argument.exception';

export class Validation {
  constructor(private value: any, private parameterName: string) {}

  private skipIfEmpty: boolean = false;
  private runIsNotEmpty: boolean = false;
  private runIsString: boolean = false;
  private runIsEnum: boolean = false;
  private runIsInteger: boolean = false;

  private isEnumEnumType: any = null;

  private shouldSkipValidation(): boolean {
    return this.skipIfEmpty && !this.value;
  }

  isOptional(): Validation {
    this.skipIfEmpty = true;
    return this;
  }

  isNotEmpty(): Validation {
    this.runIsNotEmpty = true;
    return this;
  }

  isString(): Validation {
    this.runIsString = true;
    return this;
  }

  isInteger(): Validation {
    this.runIsInteger = true;
    return this;
  }

  isEnum(enumType: any): Validation {
    this.isEnumEnumType = enumType;
    this.runIsEnum = true;
    return this;
  }

  run(): void {
    if (this.runIsNotEmpty) {
      this.isNotEmptyValidation();
    }
    if (this.shouldSkipValidation()) {
      return;
    }

    if (this.runIsString) {
      this.isStringValidation();
    }

    if (this.runIsInteger) {
      this.isIntegerValidation();
    }

    if (this.runIsEnum) {
      this.isEnumValidation();
    }
  }

  private isNotEmptyValidation() {
    if (!this.value) {
      throw new MissingArgumentException(this.parameterName);
    }
  }
  private isStringValidation() {
    if (typeof this.value !== 'string' && !(this.value instanceof String)) {
      throw new InvalidTypeArgumentException(this.parameterName, 'string');
    }
  }
  private isIntegerValidation() {
    let parsed = parseFloat(this.value);
    if (isNaN(this.value) || (parsed | 0) !== parsed) {
      throw new InvalidTypeArgumentException(this.parameterName, 'Integer');
    }
  }
  private isEnumValidation() {
    const enumTypeValues = Object.values(this.isEnumEnumType) as string[];

    if (!enumTypeValues.includes(this.value)) {
      throw new ArgumentException(
        this.parameterName,
        `Expected value: ${enumTypeValues.join('|')}`
      );
    }
  }
}

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsDayInMonthConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: number): boolean {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const daysInMonth = new Date(year, month, 0).getDate();

    return 0 < propertyValue && propertyValue <= daysInMonth;
  }

  defaultMessage(args: ValidationArguments): string {
    return `"${args.property}" must by a valid day in current month number.`;
  }
}

export function IsDayInMonth(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDayInMonthConstraint,
    });
  };
}

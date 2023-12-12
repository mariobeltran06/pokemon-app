import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const INVALID_DUI: string[] = [
  '00000000-0',
  '11111111-1',
  '22222222-2',
  '33333333-3',
  '44444444-4',
  '55555555-5',
  '66666666-6',
  '77777777-7',
  '88888888-8',
  '99999999-9',
];

export function validateDUI(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    const regex = /(^\d{8})-(\d$)/;
    const parts = value.match(regex);
    if (INVALID_DUI.includes(value)) return { isValidDUI: true };
    if (parts !== null) {
      const digits = parts[1];
      const digitVerification = parseInt(parts[2], 10);
      let summary = 0;
      for (let i = 0, l = digits.length; i < l; i++) {
        let digit = parseInt(digits[i], 10);
        summary += (9 - i) * digit;
      }
      return digitVerification === (10 - (summary % 10)) % 10
        ? null
        : { isValidDUI: true };
    } else {
      return { isValidDUI: true };
    }
  };
}

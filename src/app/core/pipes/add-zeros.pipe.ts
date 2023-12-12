import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addZeros',
  standalone: true,
})
export class AddZerosPipe implements PipeTransform {
  transform(value: number | string | undefined): string | null {
    if (typeof value === 'number') {
      const countCharacter = value.toString().length;
      return this.addZeroInString(countCharacter, value);
    } else if (typeof value === 'string') {
      const countCharacter = value.length;
      return this.addZeroInString(countCharacter, value);
    } else {
      return '000';
    }
    return null;
  }

  private addZeroInString(count: number, value: number | string): string {
    let newNumber: string = '';
    if (count === 1) {
      newNumber = '00' + value.toString();
    } else if (count === 2) {
      newNumber = '0' + value.toString();
    } else {
      newNumber = value.toString();
    }
    return newNumber;
  }
}

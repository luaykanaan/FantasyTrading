import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: number, currAbr: string): string {

    if (value == null) {
      return null;
    }
    if (!currAbr) {
      return null;
    }

    let currSymbol = '€ ';
    if (currAbr === 'USD') {
      currSymbol = '$';
    }
    if (currAbr === 'GBP') {
      currSymbol = '£';
    }

    return currSymbol + ' ' + value.toFixed(4);

  }

}

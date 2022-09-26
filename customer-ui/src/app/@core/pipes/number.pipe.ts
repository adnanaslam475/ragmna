import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'shortNumber',
  pure: false,
})
export class ShortNumberPipe implements PipeTransform {
  transform(no: number) {
    if (no == 0) {
      return 0;
    } else {
      // hundreds
      if (no <= 999) {
        return no;
      }
      // thousands
      else if (no >= 1000 && no <= 999999) {
        return (no / 1000).toFixed(2) + 'K';
      }
      // millions
      else if (no >= 1000000 && no <= 999999999) {
        return (no / 1000000).toFixed(2) + 'M';
      }
      // billions
      else if (no >= 1000000000 && no <= 999999999999) {
        return (no / 1000000000).toFixed(2) + 'B';
      } else return no;
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter',
  pure: false,
})
export class CustomFilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {
    console.log(items);
    if (!items) return [];
    if (!value || value.length == 0) return items;
    return items.filter(
      (it) => it[field].toLowerCase().indexOf(value.toLowerCase()) != -1
    );
  }
}

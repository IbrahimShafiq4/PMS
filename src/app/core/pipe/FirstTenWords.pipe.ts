import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FirstTenWords',
})
export class FirstTenWordsPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    const words = value.split(' ');
    return words.slice(0, 20).join(' ');
  }
}

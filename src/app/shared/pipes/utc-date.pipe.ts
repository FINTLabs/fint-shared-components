import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcDate'
})
export class UtcDatePipe implements PipeTransform {
  transform(value: any): any {
    return this.toDateString(value);
  }

  toDateString(timestamp) {
    let m = new Date(timestamp);
    let year = m.getUTCFullYear();
    let month = ('0' + m.getUTCMonth()).slice(-2);
    let date = ('0' + m.getUTCDate()).slice(-2);
    let hours = ('0' + m.getUTCHours()).slice(-2);
    let minutes = ('0' + m.getUTCMinutes()).slice(-2);
    return `${year}-${month}-${date} ${hours}:${minutes}`;
  }
}

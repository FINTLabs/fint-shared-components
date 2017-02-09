import { UtcDatePipe } from '../shared/pipes/utc-date.pipe';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { IEvents } from './model';

@Pipe({
  name: 'eventFilter'
})
@Injectable()
export class EventFilterPipe implements PipeTransform {
  utcDatePipe: UtcDatePipe = new UtcDatePipe();

  transform(value: IEvents[], search?: string): any {
    if (!search) { return value; }
    return value.filter(item => {
      if (item) {
        return item.events.some(e => {
          const time = this.utcDatePipe.toDateString(e.time);
          return item.corrId.toLowerCase().indexOf(search.toLowerCase()) !== -1
            || e.source.toLowerCase().indexOf(search.toLowerCase()) !== -1
            || e.client.toLowerCase().indexOf(search.toLowerCase()) !== -1
            || (e.action ? e.action.toLowerCase().indexOf(search.toLowerCase()) !== -1 : false)
            || e.status.toLowerCase().indexOf(search.toLowerCase()) !== -1
            || time.indexOf(search.toLowerCase()) !== -1;
        });
      }
      return item;
    });
  }
}

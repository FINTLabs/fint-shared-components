import { UtcDatePipe } from '../pipes/utc-date.pipe';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { IEvents } from './events.service';

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
        let time = this.utcDatePipe.toDateString(item.event.time);
        return item.corrId.toLowerCase().indexOf(search.toLowerCase()) !== -1
          || item.source.toLowerCase().indexOf(search.toLowerCase()) !== -1
          || item.event.client.toLowerCase().indexOf(search.toLowerCase()) !== -1
          || item.event.verb.toLowerCase().indexOf(search.toLowerCase()) !== -1
          || item.event.status.toLowerCase().indexOf(search.toLowerCase()) !== -1
          || time.indexOf(search.toLowerCase()) !== -1;
      }
      return item;
    });
  }
}

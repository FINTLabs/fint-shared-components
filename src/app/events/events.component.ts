import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { each } from 'lodash';

import { EventFilterPipe } from './events-filter.pipe';
import { EventService, IEvent, IEvents } from './events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: IEvents[];
  filteredEvents: IEvents[];
  start: number = 0;
  end: number = 10;
  total: number = 0;
  current: number = 0;

  private filter = new EventFilterPipe();
  _searchstring: string;
  get searchstring() { return this._searchstring; }
  set searchstring(value) {
    this._searchstring = value;
    this.current = 0;
    this.filteredEvents = this.filter.transform(this.events, value);
    this.total = this.filteredEvents.length;
    this.cdr.detectChanges();
    this.router.navigate(['/events', value]);
  }

  constructor(private EventService: EventService, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) {
    EventService.all().subscribe((events: IEvents[]) => {
      this.total = events.length;
      this.events = events;
      this.filteredEvents = events;
      this.route.params.subscribe(params => {
        if (params['search?']) {
          this.searchstring = params['search?'];
        }
      });
    });
  }

  ngOnInit() {
  }

  openEvent(event: IEvents) {
    let lastState = event.isOpen;
    each(this.events, (e: IEvents) => { e.isOpen = false; });
    event.isOpen = !lastState;
  }

  isActive(event: IEvents, status: string) {
    if (status === 'DOWNSTREAM_QUEUE') {
      return (event.events.filter((e: IEvent) => {
        return [status.toLowerCase(), 'INBOUND_QUEUE'.toLowerCase()].indexOf(e.status.toLowerCase()) > -1;
      }).length);
    }
    if (status === 'UPSTREAM_QUEUE') {
      return (event.events.filter((e: IEvent) => {
        return [status.toLowerCase(), 'OUTBOUND_QUEUE'.toLowerCase()].indexOf(e.status.toLowerCase()) > -1;
      }).length);
    }
    return (event.events.filter((e: IEvent) => e.status.toLowerCase() === status.toLowerCase()).length);
  }
}

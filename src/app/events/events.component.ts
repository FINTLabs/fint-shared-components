import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { each } from 'lodash';

import { EventFilterPipe } from './events-filter.pipe';
import { EventService } from './events.service';
import { IEventsHALPage, IEvent, IEvents } from './model';

@Component({
  selector: 'fint-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: IEvents[];
  filteredEvents: IEvents[];
  activeEvent: IEvent;
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
    EventService.all().subscribe((result: IEventsHALPage) => {
      this.total = result.total;
      this.events = result._embedded.mongoAuditEventList;
      this.filteredEvents = this.events;
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

  showDetail($event: { eventDetail: IEvent, event: IEvents }) {
    $event.event.showDetail = true;
    this.activeEvent = $event.eventDetail;
  }
}

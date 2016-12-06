import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { each } from 'lodash';

import { EventFilterPipe } from './events-filter.pipe';
import { EventService, IEvent, IEvents } from './events.service';
import * as D3 from '../d3.bundle';

@Component({
  selector: 'fint-events',
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

  eventConfig = [
    {
      downstream: [
        { id: 'NEW', type: 'stream', x: 219, y: 69 },
        { id: 'CACHE', type: 'stream', x: 219, y: 230 },
        { id: 'DOWNSTREAM_QUEUE', type: 'stream', x: 144, y: 230 },
        { id: 'DELIVERED_TO_PROVIDER', type: 'stream', x: 144, y: 310 },
        { id: 'PROVIDER_ACCEPTED', type: 'stream', x: 144, y: 393 },
        { id: 'PROVIDER_RESPONSE_ORPHAN', type: 'error', x: 80, y: 393 },
      ],
      upstream: [
        { id: 'PROVIDER_RESPONSE', type: 'stream', x: 80, y: 393 },
        { id: 'NO_RESPONSE_FOR_PROVIDER', type: 'error', x: 80, y: 393 },
        { id: 'PROVIDER_REJECTED', type: 'error', x: 80, y: 393 },
        { id: 'PROVIDER_NOT_CONFIRMED', type: 'error', x: 80, y: 393 },
        { id: 'UNABLE_TO_DELIVER', type: 'error', x: 80, y: 393 },
        { id: 'UPSTREAM_QUEUE', type: 'stream', x: 412, y: 252 },
        { id: 'CACHE_RESPONSE', type: 'stream', x: 325, y: 252 },
        { id: 'SENT_TO_CLIENT', type: 'stream', x: 325, y: 93 },
      ]
    }
  ];

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

  showDetail(name: string, event: IEvents) {
    // if (this.isActive(event, name)) {
    //   event.showDetail = true;
    // }
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

  getDetail(event: IEvents, status: string) {

  }

  wrap(text, width) {
    text.each(function () {
      let text = D3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr('y'),
        dy = parseFloat(text.attr('dy')),
        tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em');
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(' '));
        if ((<SVGTextContentElement>tspan.node()).getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = text.append('tspan').attr('x', 0).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
        }
      }
    });
  }
}

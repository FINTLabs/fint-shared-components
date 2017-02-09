import { Title } from '@angular/platform-browser';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EventService } from './events.service';
import { IEvent, IEventGroup, IEvents, IEventsHALPage } from './model';
import { FlowEvent } from './event-flow/event-flow.component';

@Component({
  selector: 'fint-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  eventGroups: IEventGroup[];
  activeEvent: IEvents;
  isLoading: boolean = false;

  // Pager config
  pages: number;
  itemsPerPage: number;
  total: number;
  _current: number; // Current page
  get current() { return this._current; }
  set current(val: number) {
    if (val != this._current) {
      this._current = val;
      this.loadEvents(this._current);
    }
  }

  _searchstring: string;
  get searchstring() { return this._searchstring; }
  set searchstring(value) {
    if (this._searchstring != value) {
      this._searchstring = value;
      this._current = 1; // Reset pager
      this.loadEvents(this._current);
    }
  }

  constructor(private EventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Hendelser | Fint');
  }

  ngOnInit() {
    // Set initial page and load data
    this.current = 1;

    // Search filter
    this.route.params.subscribe(params => {
      if (params['search?']) {
        this.searchstring = params['search?'];
      }
    });
  }

  loadEvents(page: number = 1) {
    this.isLoading = true;
    this.EventService.all(page, this.searchstring).subscribe((result: IEventsHALPage) => {
      this.isLoading = false;
      // Pager data
      this.total = result.totalItems;
      this.itemsPerPage = result.pageSize;
      this.current = result.page;
      this.pages = result.pageCount;

      // View data
      this.eventGroups = result.data;
    });
  }

  openEvent(event: IEventGroup) {
    const lastState = event.isOpen;
    this.eventGroups.forEach((e: IEventGroup) => { e.isOpen = false; });
    event.isOpen = !lastState;
  }

  showDetail(evt: FlowEvent) {
    evt.eventGroup.showDetail = true;
    this.activeEvent = evt.detail;
  }
}

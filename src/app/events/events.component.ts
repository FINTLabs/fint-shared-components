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
  _current: number = 1; // Current page
  get current() { return this._current; }
  set current(val: number) {
    if (val != this._current) {
      this._current = val;
      this.loadEvents();
    }
  }

  _searchstring: string;
  get searchstring() { return this._searchstring; }
  set searchstring(value) {
    if (this._searchstring != value) {
      this._searchstring = value;
      this._current = 1; // Reset pager
      this.loadEvents();
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
    this.loadEvents();

    // Search filter
    this.route.params.subscribe(params => {
      if (params['search?']) {
        this.searchstring = params['search?'];
      }
    });
  }

  loadEvents() {
    this.isLoading = true;
    this.EventService.all(this.current, this.itemsPerPage, this.searchstring)
      .subscribe((result: IEventsHALPage) => {
        // Pager data
        this.total = result.totalItems;
        this.itemsPerPage = result.pageSize;
        this._current = result.page;
        this.pages = result.pageCount;

        // View data
        this.eventGroups = result.data;
        this.isLoading = false;
      });
  }

  openEvent(event: IEventGroup) {
    this.activeEvent = null;
    const lastState = event.isOpen;
    this.eventGroups.forEach((e: IEventGroup) => { e.isOpen = false; });
    event.isOpen = !lastState;
  }

  showDetail(evt: FlowEvent) {
    evt.eventGroup.showDetail = true;
    this.activeEvent = evt.detail;
  }
}

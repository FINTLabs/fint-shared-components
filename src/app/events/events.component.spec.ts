/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, Title } from '@angular/platform-browser';
import { DebugElement, NgModule } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/observable/of';

import { LibSharedModule } from '../shared/shared.module';
import { EventRoutes } from './events.routes';

import { EventService } from './events.service';
import { EventsComponent } from './events.component';
import { EventFlowComponent } from './event-flow/event-flow.component';
import { EventFilterPipe } from './events-filter.pipe';
import { IEvent, IEvents, IEventsHALPage } from './model';

import { mockAuditEvents } from './mock/mockAuditEvents';

class EventServiceStub {
  all(page: number = 1, search?: string): Observable<IEventsHALPage> {
    return Observable.of(mockAuditEvents);
  }
}

@NgModule({
  imports: [RouterModule.forRoot([...EventRoutes])],
  exports: [RouterModule]
})
class MockRouterModule { }

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule.forRoot(),
        LibSharedModule,
        MockRouterModule
      ],
      declarations: [EventsComponent, EventFlowComponent, EventFilterPipe],
      providers: [
        { provide: EventService, useClass: EventServiceStub },
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

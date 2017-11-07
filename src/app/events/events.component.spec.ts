/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {
  MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatPaginatorModule, MatProgressSpinnerModule
} from '@angular/material';

import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/observable/of';

import { LibSharedModule } from '../shared/shared.module';
import { EventRoutes } from './events.routes';

import { EventService } from './events.service';
import { EventsComponent } from './events.component';
import { EventFlowComponent } from './event-flow/event-flow.component';
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
        BrowserAnimationsModule,

        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,

        AngularFontAwesomeModule,

        LibSharedModule,
        MockRouterModule,
        BrowserAnimationsModule
      ],
      declarations: [EventsComponent, EventFlowComponent],
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

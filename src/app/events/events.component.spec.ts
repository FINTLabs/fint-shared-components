import { Subscribable } from 'rxjs/Observable';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/observable/from';

import { LibSharedModule } from '../shared/shared.module';
import { EventRoutes } from './events.routes';

import { EventService } from './events.service';
import { EventsComponent } from './events.component';
import { IEvent, IEvents } from './model';


class EventServiceStub {
  all(): Observable<IEvents[]> {
    let subject = new Subject<IEvents[]>();
    subject.next([
      {
        corrId: '',
        source: '',
        orgId: '',
        timestamp: 1000,
        event: {
          corrId: '',
          verb: '',
          status: '',
          time: 112312,
          orgId: '',
          source: '',
          client: '',
          data: ['', '']
        }
      }
    ]);
    return Observable.from(subject);
  }
}

class RouterStub {

}

class ActivatedRouteStub {

}

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        LibSharedModule,
        RouterModule.forChild([...EventRoutes])
      ],
      declarations: [EventsComponent],
      providers: [
        { provide: EventService, useClass: EventServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
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

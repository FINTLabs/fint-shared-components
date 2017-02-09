/* tslint:disable:no-unused-variable */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IEventGroup } from '../model';
import { EventFlowComponent } from './event-flow.component';
import { mockAuditEventGroup } from '../mock/mockAuditEvents';

describe('EventFlowComponent', () => {
  let component: EventFlowComponent;
  let fixture: ComponentFixture<MockEventsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockEventsWrapperComponent, EventFlowComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockEventsWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


@Component({
  selector: 'fint-mockevents-wrapper',
  template: '<fint-event-flow [eventGroup]="eventGroup" (onOpen)="showDetail($event)"></fint-event-flow>'
})
class MockEventsWrapperComponent {
  eventGroup = <IEventGroup>mockAuditEventGroup;

  showDetail($event) { }
}

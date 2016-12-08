/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventFlowComponent } from './event-flow.component';

describe('EventFlowComponent', () => {
  let component: EventFlowComponent;
  let fixture: ComponentFixture<EventFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

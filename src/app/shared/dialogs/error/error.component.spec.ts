import { CommonModule } from '@angular/common';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NgModule } from '@angular/core';
import { MaterialModule, MdDialog, MdDialogModule } from '@angular/material';

import { ErrorComponent } from './error.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MdDialogModule.forRoot()
  ],
  entryComponents: [ErrorComponent],
  declarations: [ErrorComponent]
})
class ErrorDialogSpecModule { }

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let dialog: MdDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ErrorDialogSpecModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MdDialog);
    const dialogRef = dialog.open(ErrorComponent);
    component = dialogRef.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

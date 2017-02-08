import { BrowserModule } from '@angular/platform-browser';
/* tslint:disable:no-unused-variable */
import { NgModule } from '@angular/core';

import { TestBed, async, inject } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { FintDialogService } from './fint-dialog.service';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { ErrorComponent } from './error/error.component';

describe('FintDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule
      ],
      providers: [
        FintDialogService,
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  it('should be injected', inject([FintDialogService], (service: FintDialogService) => {
    expect(service).toBeTruthy();
  }));

  describe('ErrorDialog', () => {
    it('should display http errors', inject([FintDialogService], (service: FintDialogService) => {
      const mockResponse = new Response(new ResponseOptions({ body: { message: 'error' }, status: 500 }));
      service.displayHttpError(mockResponse);
    }));

    it('should display custom errors', inject([FintDialogService], (service: FintDialogService) => {
      service.displayError('subtitle', 'message');
    }));
  });

  describe('ConfirmDelete', () => {
    it('should display a confirmation dialog', inject([FintDialogService], (service: FintDialogService) => {
      service.confirmDelete();
    }));
  });
});

@NgModule({
  declarations: [
    ErrorComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule.forRoot()
  ],
  entryComponents: [ConfirmDeleteComponent, ErrorComponent]
})
export class MockModule { }

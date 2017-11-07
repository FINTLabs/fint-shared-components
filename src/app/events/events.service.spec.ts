/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { ConnectionBackend, Http, BaseRequestOptions } from '@angular/http';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EventService } from './events.service';
import { FintDialogService } from '../shared/dialogs';

describe('Service: Events', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // Required for testing components using angular-material
        MatDialogModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions,
        EventService,
        FintDialogService,
      ]
    });
  });

  it('should ...', inject([EventService], (service: EventService) => {
    expect(service).toBeTruthy();
  }));
});

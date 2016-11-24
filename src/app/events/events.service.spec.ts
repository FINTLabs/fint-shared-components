import { MockBackend } from '@angular/http/testing';
import { ConnectionBackend, Http, BaseRequestOptions } from '@angular/http';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventService } from './events.service';

describe('Service: Events', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions,
        EventService
      ]
    });
  });

  it('should ...', inject([EventService], (service: EventService) => {
    expect(service).toBeTruthy();
  }));
});

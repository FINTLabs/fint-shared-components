/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { ConnectionBackend, Http, BaseRequestOptions } from '@angular/http';
import { MdDialog, Overlay, OverlayContainer } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OVERLAY_PROVIDERS } from "@angular/material";

import { EventService } from './events.service';
import { FintDialogService } from '../shared/dialogs';

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
        EventService,
        FintDialogService,

        // Required for testing components using angular-material
        MdDialog,
        Overlay,
        OverlayContainer,
        BrowserAnimationsModule,
        OVERLAY_PROVIDERS
      ]
    });
  });

  it('should ...', inject([EventService], (service: EventService) => {
    expect(service).toBeTruthy();
  }));
});

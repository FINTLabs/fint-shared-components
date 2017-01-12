/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FintDialogService } from './fint-dialog.service';

describe('FintDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FintDialogService]
    });
  });

  it('should ...', inject([FintDialogService], (service: FintDialogService) => {
    expect(service).toBeTruthy();
  }));
});

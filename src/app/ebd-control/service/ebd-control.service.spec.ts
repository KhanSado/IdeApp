import { TestBed } from '@angular/core/testing';

import { EbdControlService } from './ebd-control.service';

describe('EbdControlService', () => {
  let service: EbdControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EbdControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

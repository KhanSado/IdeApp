import { TestBed } from '@angular/core/testing';

import { CultControlService } from './cult-control.service';

describe('CultControlService', () => {
  let service: CultControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CultControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

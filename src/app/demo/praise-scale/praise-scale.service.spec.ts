import { TestBed } from '@angular/core/testing';

import { PraiseScaleService } from './praise-scale.service';

describe('PraiseScaleService', () => {
  let service: PraiseScaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PraiseScaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

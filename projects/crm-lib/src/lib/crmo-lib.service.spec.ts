import { TestBed } from '@angular/core/testing';

import { CrmoLibService } from './crmo-lib.service';

describe('CrmoLibService', () => {
  let service: CrmoLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrmoLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

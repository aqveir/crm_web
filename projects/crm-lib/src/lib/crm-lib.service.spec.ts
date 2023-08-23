import { TestBed } from '@angular/core/testing';

import { CrmLibService } from './crm-lib.service';

describe('CrmLibService', () => {
  let service: CrmLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrmLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

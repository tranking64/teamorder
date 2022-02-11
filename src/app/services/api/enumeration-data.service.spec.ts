import { TestBed } from '@angular/core/testing';

import { EnumerationDataService } from './enumeration-data.service';

describe('EnumerationDataService', () => {
  let service: EnumerationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnumerationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

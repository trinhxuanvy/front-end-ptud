import { TestBed } from '@angular/core/testing';

import { FortestService } from './fortest.service';

describe('FortestService', () => {
  let service: FortestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FortestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

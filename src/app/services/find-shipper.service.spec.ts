import { TestBed } from '@angular/core/testing';

import { FindShipperService } from './find-shipper.service';

describe('FindShipperService', () => {
  let service: FindShipperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindShipperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

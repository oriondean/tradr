import { TestBed } from '@angular/core/testing';

import { PublicOrdersService } from './public-orders.service';

describe('PublicOrdersService', () => {
  let service: PublicOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

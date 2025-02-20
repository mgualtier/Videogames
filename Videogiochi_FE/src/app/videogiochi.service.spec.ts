import { TestBed } from '@angular/core/testing';

import { VideogiochiService } from './videogiochi.service';

describe('VideogiochiService', () => {
  let service: VideogiochiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideogiochiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

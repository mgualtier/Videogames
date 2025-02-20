import { TestBed } from '@angular/core/testing';

import { PiattaformaService } from './piattaforma.service';

describe('PiattaformaService', () => {
  let service: PiattaformaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiattaformaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

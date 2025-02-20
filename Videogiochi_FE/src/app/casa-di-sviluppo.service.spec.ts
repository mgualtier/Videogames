import { TestBed } from '@angular/core/testing';

import { CasaDiSviluppoService } from './casa-di-sviluppo.service';

describe('CasaDiSviluppoService', () => {
  let service: CasaDiSviluppoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasaDiSviluppoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

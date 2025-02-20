import { TestBed } from '@angular/core/testing';

import { AssistenzaService } from './assistenza.service';

describe('AssistenzaService', () => {
  let service: AssistenzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssistenzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ControloperacionService } from './controloperacion.service';

describe('ControloperacionService', () => {
  let service: ControloperacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControloperacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

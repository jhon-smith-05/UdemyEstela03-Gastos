import { TestBed } from '@angular/core/testing';

import { GastosPorDiaService } from './gastos-por-dia.service';

describe('GastosPorDiaService', () => {
  let service: GastosPorDiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GastosPorDiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ProveedoresStateService } from './proveedores-state.service';

describe('ProveedoresStateService', () => {
  let service: ProveedoresStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProveedoresStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

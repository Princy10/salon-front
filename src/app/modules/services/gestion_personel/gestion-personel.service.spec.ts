import { TestBed } from '@angular/core/testing';

import { GestionPersonelService } from './gestion-personel.service';

describe('GestionPersonelService', () => {
  let service: GestionPersonelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionPersonelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

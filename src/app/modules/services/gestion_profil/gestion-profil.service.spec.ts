import { TestBed } from '@angular/core/testing';

import { GestionProfilService } from './gestion-profil.service';

describe('GestionProfilService', () => {
  let service: GestionProfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionProfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

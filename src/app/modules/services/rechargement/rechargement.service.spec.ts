import { TestBed } from '@angular/core/testing';

import { RechargementService } from './rechargement.service';

describe('RechargementService', () => {
  let service: RechargementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RechargementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { JournalCaisseService } from './journal-caisse.service';

describe('JournalCaisseService', () => {
  let service: JournalCaisseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalCaisseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

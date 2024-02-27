import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJournalCaisseComponent } from './list-journal-caisse.component';

describe('ListJournalCaisseComponent', () => {
  let component: ListJournalCaisseComponent;
  let fixture: ComponentFixture<ListJournalCaisseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListJournalCaisseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListJournalCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

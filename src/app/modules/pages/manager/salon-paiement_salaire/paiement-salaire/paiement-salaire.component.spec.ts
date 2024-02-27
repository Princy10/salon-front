import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementSalaireComponent } from './paiement-salaire.component';

describe('PaiementSalaireComponent', () => {
  let component: PaiementSalaireComponent;
  let fixture: ComponentFixture<PaiementSalaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementSalaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaiementSalaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

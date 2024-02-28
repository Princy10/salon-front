import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviTacheComponent } from './suivi-tache.component';

describe('SuiviTacheComponent', () => {
  let component: SuiviTacheComponent;
  let fixture: ComponentFixture<SuiviTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuiviTacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuiviTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

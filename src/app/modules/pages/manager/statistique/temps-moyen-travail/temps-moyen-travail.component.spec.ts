import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempsMoyenTravailComponent } from './temps-moyen-travail.component';

describe('TempsMoyenTravailComponent', () => {
  let component: TempsMoyenTravailComponent;
  let fixture: ComponentFixture<TempsMoyenTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempsMoyenTravailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempsMoyenTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

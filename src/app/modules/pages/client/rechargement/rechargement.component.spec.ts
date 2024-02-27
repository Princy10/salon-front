import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargementComponent } from './rechargement.component';

describe('RechargementComponent', () => {
  let component: RechargementComponent;
  let fixture: ComponentFixture<RechargementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechargementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvEmplyerComponent } from './rdv-emplyer.component';

describe('RdvEmplyerComponent', () => {
  let component: RdvEmplyerComponent;
  let fixture: ComponentFixture<RdvEmplyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvEmplyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RdvEmplyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

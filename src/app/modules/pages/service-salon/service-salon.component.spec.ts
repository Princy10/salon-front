import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSalonComponent } from './service-salon.component';

describe('ServiceSalonComponent', () => {
  let component: ServiceSalonComponent;
  let fixture: ComponentFixture<ServiceSalonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceSalonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEmployerComponent } from './liste-employer.component';

describe('ListeEmployerComponent', () => {
  let component: ListeEmployerComponent;
  let fixture: ComponentFixture<ListeEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeEmployerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

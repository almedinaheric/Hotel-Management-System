import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikaziBrojRezervacijeComponent } from './prikazi-broj-rezervacije.component';

describe('PrikaziBrojRezervacijeComponent', () => {
  let component: PrikaziBrojRezervacijeComponent;
  let fixture: ComponentFixture<PrikaziBrojRezervacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrikaziBrojRezervacijeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrikaziBrojRezervacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

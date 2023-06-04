import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UplataRezervacijeComponent } from './uplata-rezervacije.component';

describe('UplataRezervacijeComponent', () => {
  let component: UplataRezervacijeComponent;
  let fixture: ComponentFixture<UplataRezervacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UplataRezervacijeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UplataRezervacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

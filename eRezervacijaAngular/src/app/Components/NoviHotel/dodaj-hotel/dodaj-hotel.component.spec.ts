import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajHotelComponent } from './dodaj-hotel.component';

describe('DodajHotelComponent', () => {
  let component: DodajHotelComponent;
  let fixture: ComponentFixture<DodajHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajHotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodajHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

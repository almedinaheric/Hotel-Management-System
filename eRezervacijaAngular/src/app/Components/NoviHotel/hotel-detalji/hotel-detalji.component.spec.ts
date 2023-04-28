import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelDetaljiComponent } from './hotel-detalji.component';

describe('HotelDetaljiComponent', () => {
  let component: HotelDetaljiComponent;
  let fixture: ComponentFixture<HotelDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelDetaljiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdabraniHotelComponent } from './odabrani-hotel.component';

describe('OdabraniHotelComponent', () => {
  let component: OdabraniHotelComponent;
  let fixture: ComponentFixture<OdabraniHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdabraniHotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdabraniHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

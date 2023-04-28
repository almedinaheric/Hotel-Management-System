import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrediHotelComponent } from './uredi-hotel.component';

describe('UrediHotelComponent', () => {
  let component: UrediHotelComponent;
  let fixture: ComponentFixture<UrediHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrediHotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrediHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

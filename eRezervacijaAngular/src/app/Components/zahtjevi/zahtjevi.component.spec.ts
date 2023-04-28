import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahtjeviComponent } from './zahtjevi.component';

describe('ZahtjeviComponent', () => {
  let component: ZahtjeviComponent;
  let fixture: ComponentFixture<ZahtjeviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahtjeviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZahtjeviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

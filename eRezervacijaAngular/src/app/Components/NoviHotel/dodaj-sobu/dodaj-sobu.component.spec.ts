import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajSobuComponent } from './dodaj-sobu.component';

describe('DodajSobuComponent', () => {
  let component: DodajSobuComponent;
  let fixture: ComponentFixture<DodajSobuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajSobuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodajSobuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

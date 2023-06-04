import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajRecenzijuComponent } from './dodaj-recenziju.component';

describe('DodajRecenzijuComponent', () => {
  let component: DodajRecenzijuComponent;
  let fixture: ComponentFixture<DodajRecenzijuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajRecenzijuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodajRecenzijuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

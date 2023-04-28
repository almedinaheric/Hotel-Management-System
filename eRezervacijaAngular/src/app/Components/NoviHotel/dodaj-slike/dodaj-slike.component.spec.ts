import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajSlikeComponent } from './dodaj-slike.component';

describe('DodajSlikeComponent', () => {
  let component: DodajSlikeComponent;
  let fixture: ComponentFixture<DodajSlikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajSlikeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodajSlikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

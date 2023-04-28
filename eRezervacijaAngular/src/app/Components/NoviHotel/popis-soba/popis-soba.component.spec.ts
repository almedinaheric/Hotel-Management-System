import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopisSobaComponent } from './popis-soba.component';

describe('PopisSobaComponent', () => {
  let component: PopisSobaComponent;
  let fixture: ComponentFixture<PopisSobaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopisSobaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopisSobaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

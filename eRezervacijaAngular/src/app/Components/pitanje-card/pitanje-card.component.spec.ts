import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PitanjeCardComponent } from './pitanje-card.component';

describe('PitanjeCardComponent', () => {
  let component: PitanjeCardComponent;
  let fixture: ComponentFixture<PitanjeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PitanjeCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PitanjeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

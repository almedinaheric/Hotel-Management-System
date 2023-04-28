import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecenzijaCardComponent } from './recenzija-card.component';

describe('RecenzijaCardComponent', () => {
  let component: RecenzijaCardComponent;
  let fixture: ComponentFixture<RecenzijaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecenzijaCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecenzijaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

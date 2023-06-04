import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFaktorComponent } from './two-faktor.component';

describe('TwoFaktorComponent', () => {
  let component: TwoFaktorComponent;
  let fixture: ComponentFixture<TwoFaktorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoFaktorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoFaktorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

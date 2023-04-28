import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsteInformacijeComponent } from './opste-informacije.component';

describe('OpsteInformacijeComponent', () => {
  let component: OpsteInformacijeComponent;
  let fixture: ComponentFixture<OpsteInformacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsteInformacijeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsteInformacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

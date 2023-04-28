import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterGostComponent } from './register-gost.component';

describe('RegisterGostComponent', () => {
  let component: RegisterGostComponent;
  let fixture: ComponentFixture<RegisterGostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterGostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterGostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

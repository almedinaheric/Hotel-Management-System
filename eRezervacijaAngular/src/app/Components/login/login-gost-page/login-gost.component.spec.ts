import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginGostComponent } from './login-gost.component';

describe('LoginGostComponent', () => {
  let component: LoginGostComponent;
  let fixture: ComponentFixture<LoginGostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginGostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginGostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

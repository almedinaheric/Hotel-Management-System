import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginVlasnikComponent } from './login-vlasnik.component';

describe('LoginVlasnikComponent', () => {
  let component: LoginVlasnikComponent;
  let fixture: ComponentFixture<LoginVlasnikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginVlasnikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginVlasnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

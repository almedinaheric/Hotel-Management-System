import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOpeningPageComponent } from './login-opening-page.component';

describe('LoginOpeningPageComponent', () => {
  let component: LoginOpeningPageComponent;
  let fixture: ComponentFixture<LoginOpeningPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginOpeningPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginOpeningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

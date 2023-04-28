import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVlasnikComponent } from './register-vlasnik.component';

describe('RegisterVlasnikComponent', () => {
  let component: RegisterVlasnikComponent;
  let fixture: ComponentFixture<RegisterVlasnikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterVlasnikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterVlasnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

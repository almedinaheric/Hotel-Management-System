import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularniGradoviComponent } from './popularni-gradovi.component';

describe('PopularniGradoviComponent', () => {
  let component: PopularniGradoviComponent;
  let fixture: ComponentFixture<PopularniGradoviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularniGradoviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularniGradoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

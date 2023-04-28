import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromijeniLozinkuComponent } from './promijeni-lozinku.component';

describe('PromijeniLozinkuComponent', () => {
  let component: PromijeniLozinkuComponent;
  let fixture: ComponentFixture<PromijeniLozinkuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromijeniLozinkuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromijeniLozinkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisokoocjenjeniHoteliComponent } from './visokoocjenjeni-hoteli.component';

describe('VisokoocjenjeniHoteliComponent', () => {
  let component: VisokoocjenjeniHoteliComponent;
  let fixture: ComponentFixture<VisokoocjenjeniHoteliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisokoocjenjeniHoteliComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisokoocjenjeniHoteliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopisHotelaComponent } from './popis-hotela.component';

describe('PopisHotelaComponent', () => {
  let component: PopisHotelaComponent;
  let fixture: ComponentFixture<PopisHotelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopisHotelaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopisHotelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

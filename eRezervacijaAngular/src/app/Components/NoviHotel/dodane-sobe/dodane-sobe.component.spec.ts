import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodaneSobeComponent } from './dodane-sobe.component';

describe('DodaneSobeComponent', () => {
  let component: DodaneSobeComponent;
  let fixture: ComponentFixture<DodaneSobeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodaneSobeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodaneSobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PretragaFormaComponent } from './pretraga-forma.component';

describe('PretragaFormaComponent', () => {
  let component: PretragaFormaComponent;
  let fixture: ComponentFixture<PretragaFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PretragaFormaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PretragaFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

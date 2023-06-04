import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdaberiJezikComponent } from './odaberi-jezik.component';

describe('OdaberiJezikComponent', () => {
  let component: OdaberiJezikComponent;
  let fixture: ComponentFixture<OdaberiJezikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdaberiJezikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdaberiJezikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

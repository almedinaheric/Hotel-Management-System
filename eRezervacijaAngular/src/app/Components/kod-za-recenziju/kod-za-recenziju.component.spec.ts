import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KodZaRecenzijuComponent } from './kod-za-recenziju.component';

describe('KodZaRecenzijuComponent', () => {
  let component: KodZaRecenzijuComponent;
  let fixture: ComponentFixture<KodZaRecenzijuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KodZaRecenzijuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KodZaRecenzijuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

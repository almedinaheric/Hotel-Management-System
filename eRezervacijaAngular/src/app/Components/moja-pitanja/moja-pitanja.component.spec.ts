import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojaPitanjaComponent } from './moja-pitanja.component';

describe('MojaPitanjaComponent', () => {
  let component: MojaPitanjaComponent;
  let fixture: ComponentFixture<MojaPitanjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MojaPitanjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MojaPitanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaSobaComponent } from './tabela-soba.component';

describe('TabelaSobaComponent', () => {
  let component: TabelaSobaComponent;
  let fixture: ComponentFixture<TabelaSobaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaSobaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaSobaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

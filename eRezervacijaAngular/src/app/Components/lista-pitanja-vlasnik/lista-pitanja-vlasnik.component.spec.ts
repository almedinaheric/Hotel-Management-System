import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPitanjaVlasnikComponent } from './lista-pitanja-vlasnik.component';

describe('ListaPitanjaVlasnikComponent', () => {
  let component: ListaPitanjaVlasnikComponent;
  let fixture: ComponentFixture<ListaPitanjaVlasnikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPitanjaVlasnikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPitanjaVlasnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPitanjaAdminComponent } from './lista-pitanja-admin.component';

describe('ListaPitanjaAdminComponent', () => {
  let component: ListaPitanjaAdminComponent;
  let fixture: ComponentFixture<ListaPitanjaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPitanjaAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPitanjaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

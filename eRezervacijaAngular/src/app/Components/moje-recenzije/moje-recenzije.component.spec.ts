import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojeRecenzijeComponent } from './moje-recenzije.component';

describe('MojeRecenzijeComponent', () => {
  let component: MojeRecenzijeComponent;
  let fixture: ComponentFixture<MojeRecenzijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MojeRecenzijeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MojeRecenzijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

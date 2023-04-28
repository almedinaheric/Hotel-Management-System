import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojiObjektiComponent } from './moji-objekti.component';

describe('MojiObjektiComponent', () => {
  let component: MojiObjektiComponent;
  let fixture: ComponentFixture<MojiObjektiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MojiObjektiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MojiObjektiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

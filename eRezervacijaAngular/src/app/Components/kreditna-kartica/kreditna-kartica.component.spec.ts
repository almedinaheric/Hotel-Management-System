import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KreditnaKarticaComponent } from './kreditna-kartica.component';

describe('KreditnaKarticaComponent', () => {
  let component: KreditnaKarticaComponent;
  let fixture: ComponentFixture<KreditnaKarticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KreditnaKarticaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KreditnaKarticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

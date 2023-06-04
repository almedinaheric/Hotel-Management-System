import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewRezervacijePopupComponent } from './preview-rezervacije-popup.component';

describe('PreviewRezervacijePopupComponent', () => {
  let component: PreviewRezervacijePopupComponent;
  let fixture: ComponentFixture<PreviewRezervacijePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewRezervacijePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewRezervacijePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

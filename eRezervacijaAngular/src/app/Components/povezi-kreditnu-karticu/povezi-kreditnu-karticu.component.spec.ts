import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoveziKreditnuKarticuComponent } from './povezi-kreditnu-karticu.component';

describe('PoveziKreditnuKarticuComponent', () => {
  let component: PoveziKreditnuKarticuComponent;
  let fixture: ComponentFixture<PoveziKreditnuKarticuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoveziKreditnuKarticuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoveziKreditnuKarticuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

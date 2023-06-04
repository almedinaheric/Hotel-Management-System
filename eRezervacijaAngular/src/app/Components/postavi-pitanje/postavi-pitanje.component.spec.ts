import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostaviPitanjeComponent } from './postavi-pitanje.component';

describe('PostaviPitanjeComponent', () => {
  let component: PostaviPitanjeComponent;
  let fixture: ComponentFixture<PostaviPitanjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostaviPitanjeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostaviPitanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

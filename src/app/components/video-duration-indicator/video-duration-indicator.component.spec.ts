import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDurationIndicatorComponent } from './video-duration-indicator.component';

describe('VideoDurationIndicatorComponent', () => {
  let component: VideoDurationIndicatorComponent;
  let fixture: ComponentFixture<VideoDurationIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoDurationIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDurationIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

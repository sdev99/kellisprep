import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakingSectionComponent } from './speaking-section.component';

describe('SpeakingSectionComponent', () => {
  let component: SpeakingSectionComponent;
  let fixture: ComponentFixture<SpeakingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeakingSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

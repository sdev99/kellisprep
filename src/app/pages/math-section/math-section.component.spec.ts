import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathSectionComponent } from './math-section.component';

describe('MathSectionComponent', () => {
  let component: MathSectionComponent;
  let fixture: ComponentFixture<MathSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MathSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MathSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

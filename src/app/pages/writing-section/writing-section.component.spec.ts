import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingSectionComponent } from './writing-section.component';

describe('WritingSectionComponent', () => {
  let component: WritingSectionComponent;
  let fixture: ComponentFixture<WritingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WritingSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WritingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

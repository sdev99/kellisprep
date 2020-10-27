import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizeExamcourseComponent } from './personalize-examcourse.component';

describe('PersonalizeExamcourseComponent', () => {
  let component: PersonalizeExamcourseComponent;
  let fixture: ComponentFixture<PersonalizeExamcourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalizeExamcourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizeExamcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDirectionComponent } from './section-direction.component';

describe('SectionDirectionComponent', () => {
  let component: SectionDirectionComponent;
  let fixture: ComponentFixture<SectionDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionDirectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

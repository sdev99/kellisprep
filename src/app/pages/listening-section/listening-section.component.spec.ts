import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningSectionComponent } from './listening-section.component';

describe('ListeningSectionComponent', () => {
  let component: ListeningSectionComponent;
  let fixture: ComponentFixture<ListeningSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeningSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeningSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

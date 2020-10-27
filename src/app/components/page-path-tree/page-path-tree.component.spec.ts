import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePathTreeComponent } from './page-path-tree.component';

describe('PagePathTreeComponent', () => {
  let component: PagePathTreeComponent;
  let fixture: ComponentFixture<PagePathTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePathTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePathTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

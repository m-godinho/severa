import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogTableListComponent } from './worklog-table-list.component';

describe('WorklogTableListComponent', () => {
  let component: WorklogTableListComponent;
  let fixture: ComponentFixture<WorklogTableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklogTableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklogTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

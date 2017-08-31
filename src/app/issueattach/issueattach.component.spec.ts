import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueattachComponent } from './issueattach.component';

describe('IssueattachComponent', () => {
  let component: IssueattachComponent;
  let fixture: ComponentFixture<IssueattachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueattachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueattachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

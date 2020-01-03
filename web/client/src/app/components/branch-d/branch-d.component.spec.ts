import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchDComponent } from './branch-d.component';

describe('BranchDComponent', () => {
  let component: BranchDComponent;
  let fixture: ComponentFixture<BranchDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

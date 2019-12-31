import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentsEmployeeComponent } from './rents-employee.component';

describe('RentsEmployeeComponent', () => {
  let component: RentsEmployeeComponent;
  let fixture: ComponentFixture<RentsEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentsEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentsEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

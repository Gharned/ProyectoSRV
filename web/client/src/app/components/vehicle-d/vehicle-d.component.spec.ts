import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDComponent } from './vehicle-d.component';

describe('VehicleDComponent', () => {
  let component: VehicleDComponent;
  let fixture: ComponentFixture<VehicleDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

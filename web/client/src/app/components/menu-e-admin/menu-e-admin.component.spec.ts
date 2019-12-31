import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEAdminComponent } from './menu-e-admin.component';

describe('MenuEAdminComponent', () => {
  let component: MenuEAdminComponent;
  let fixture: ComponentFixture<MenuEAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuEAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuERentadorComponent } from './menu-e-rentador.component';

describe('MenuERentadorComponent', () => {
  let component: MenuERentadorComponent;
  let fixture: ComponentFixture<MenuERentadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuERentadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuERentadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

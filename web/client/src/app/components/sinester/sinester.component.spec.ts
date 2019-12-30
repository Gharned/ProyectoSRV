import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinesterComponent } from './sinester.component';

describe('SinesterComponent', () => {
  let component: SinesterComponent;
  let fixture: ComponentFixture<SinesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDComponent } from './client-d.component';

describe('ClientDComponent', () => {
  let component: ClientDComponent;
  let fixture: ComponentFixture<ClientDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

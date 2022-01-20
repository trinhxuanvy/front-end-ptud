import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindShipperComponent } from './find-shipper.component';

describe('FindShipperComponent', () => {
  let component: FindShipperComponent;
  let fixture: ComponentFixture<FindShipperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindShipperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindShipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

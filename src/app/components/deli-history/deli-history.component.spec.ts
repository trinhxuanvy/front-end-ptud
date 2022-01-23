import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliHistoryComponent } from './deli-history.component';

describe('DeliHistoryComponent', () => {
  let component: DeliHistoryComponent;
  let fixture: ComponentFixture<DeliHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

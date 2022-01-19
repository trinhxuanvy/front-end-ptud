import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceOfStoreComponent } from './invoice-of-store.component';

describe('InvoiceOfStoreComponent', () => {
  let component: InvoiceOfStoreComponent;
  let fixture: ComponentFixture<InvoiceOfStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceOfStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceOfStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

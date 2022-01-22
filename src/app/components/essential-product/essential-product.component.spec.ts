import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssentialProductComponent } from './essential-product.component';

describe('EssentialProductComponent', () => {
  let component: EssentialProductComponent;
  let fixture: ComponentFixture<EssentialProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EssentialProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EssentialProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

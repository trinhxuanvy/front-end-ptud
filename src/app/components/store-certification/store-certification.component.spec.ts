import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCertificationComponent } from './store-certification.component';

describe('StoreCertificationComponent', () => {
  let component: StoreCertificationComponent;
  let fixture: ComponentFixture<StoreCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCertificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseStoreComponent } from './disease-store.component';

describe('DiseaseStoreComponent', () => {
  let component: DiseaseStoreComponent;
  let fixture: ComponentFixture<DiseaseStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

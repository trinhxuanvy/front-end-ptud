import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FortestComponent } from './fortest.component';

describe('FortestComponent', () => {
  let component: FortestComponent;
  let fixture: ComponentFixture<FortestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FortestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FortestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

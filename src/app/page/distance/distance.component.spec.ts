import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DistanceComponent } from './distance.component';

describe('DistanceComponent', () => {
  let component: DistanceComponent;
  let fixture: ComponentFixture<DistanceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegionRectComponent } from './region-rect.component';

describe('RegionRectComponent', () => {
  let component: RegionRectComponent;
  let fixture: ComponentFixture<RegionRectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionRectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionRectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

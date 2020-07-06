import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionRectComponent } from './region-rect.component';

describe('RegionRectComponent', () => {
  let component: RegionRectComponent;
  let fixture: ComponentFixture<RegionRectComponent>;

  beforeEach(async(() => {
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

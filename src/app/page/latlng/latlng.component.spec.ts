import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatlngComponent } from './latlng.component';

describe('LatlngComponent', () => {
  let component: LatlngComponent;
  let fixture: ComponentFixture<LatlngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatlngComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatlngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

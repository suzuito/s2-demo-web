import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EdgeComponent } from './edge.component';

describe('EdgeComponent', () => {
  let component: EdgeComponent;
  let fixture: ComponentFixture<EdgeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

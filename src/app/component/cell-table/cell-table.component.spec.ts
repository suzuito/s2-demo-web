import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CellTableComponent } from './cell-table.component';

describe('CellTableComponent', () => {
  let component: CellTableComponent;
  let fixture: ComponentFixture<CellTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CellTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

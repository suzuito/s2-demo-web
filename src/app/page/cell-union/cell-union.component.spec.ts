import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellUnionComponent } from './cell-union.component';

describe('CellUnionComponent', () => {
  let component: CellUnionComponent;
  let fixture: ComponentFixture<CellUnionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellUnionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellUnionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

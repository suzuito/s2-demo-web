import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CellLiteral } from 'src/app/entity/s2';

@Component({
  selector: 'app-cell-table',
  templateUrl: './cell-table.component.html',
  styleUrls: ['./cell-table.component.scss']
})
export class CellTableComponent implements OnInit {

  @Input()
  public cells: Array<CellLiteral>;

  @Input()
  public disabledGetChildrenButton: boolean;

  @Output()
  public mouseOverRow: EventEmitter<CellLiteral>;

  @Output()
  public mouseOutRow: EventEmitter<CellLiteral>;

  @Output()
  public clickGetChildren: EventEmitter<CellLiteral>;

  constructor() {
    this.disabledGetChildrenButton = false;
    this.mouseOutRow = new EventEmitter<CellLiteral>();
    this.mouseOverRow = new EventEmitter<CellLiteral>();
    this.clickGetChildren = new EventEmitter<CellLiteral>();
  }

  ngOnInit(): void {
  }

  mouseOverCellRow(c: CellLiteral): void {
    this.mouseOverRow.emit(c);
  }
  mouseOutCellRow(c: CellLiteral): void {
    this.mouseOutRow.emit(c);
  }

  clickGetChildrenInternal(c: CellLiteral): void {
    this.clickGetChildren.emit(c);
  }

  map1Bin(c: CellLiteral): string {
    const i = parseInt(`0x${c.id}`, 16);
    return i.toString(2);
  }

}

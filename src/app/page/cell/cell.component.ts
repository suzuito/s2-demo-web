import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MarkerLiteral, newPolylineFromGeoJSONPolygon, PolylineLiteral } from '../gmaputils';
import { ApiService } from 'src/app/api.service';
import { CellLiteral } from 'src/app/entity/s2';
import { unitSphere, displayRotateY } from 'src/app/threejs/sphere';
import * as THREE from 'three';
import { BaseComponent } from '../base/base.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent extends BaseComponent implements OnInit, AfterViewInit {

  public codeCellFromLatLng = `
  latlng := s2.LatLngFromDegrees(lat, lng)
  // LatLngからCellを生成する（このメソッドは階層は30のCellを返す）
  cell := s2.CellFromLatLng(latlng)
  // CellのIDを取得する
  cellID := cell.ID()
  // Cellの階層を取得する
  level := cell.Level()
  // Cellの面積（単位球面上の面積）を算出する
  area := cell.AproxArea()
  // Cellの親のCellを取得する（下は階層10のCellを取得する）
  parentCellID := cellID.Parent(10)
  // 現在のCellの1つ下の階層の子Cellを取得する
  for childCellID := cellID.ChildBegin(); childCellID != cellID.ChildEnd(); childCellID = childCellID.Next() {
    fmt.Println(childCellID.String())
  }
  `;

  public map1Center: google.maps.LatLngLiteral;
  public map1InitialCellToken: string;
  public map1Cells: Array<CellLiteral>;
  public map1CellPolylines: Array<PolylineLiteral>;
  public map1MouseOverCell: CellLiteral;
  public map1MinID: string;
  public map1MaxID: string;

  @ViewChild('elUnitSphere')
  private elUnitSphere: ElementRef;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super(route, router);
    this.map1InitialCellToken = '7';
    this.map1Cells = [];
    this.map1CellPolylines = [];
    this.map1Center = { lat: 0, lng: 0 };
    this.map1MouseOverCell = null;
    this.map1MinID = '';
    this.map1MaxID = '';
  }

  ngOnInit(): void {
    super.OnInit();
    this.api.postCellFromToken(this.map1InitialCellToken).then(v => {
      this.pushMap1Cells(v);
      this.updateMap1Polylines();
      this.map1Center = v.center;
    });
  }

  ngAfterViewInit(): void {
    super.AfterViewInit();
  }

  // Map1

  private pushMap1Cells(...cells: Array<CellLiteral>): void {
    cells = cells.filter(cell => !this.map1Cells.find(c => c.id === cell.id));
    this.map1Cells.push(...cells);
    this.map1Cells.sort((a, b) => a.id < b.id ? -1 : 1);
  }

  private updateMap1Polylines(): void {
    this.map1CellPolylines = [];
    this.map1Cells.forEach(v => {
      const a = newPolylineFromGeoJSONPolygon(v.geoJson.geometry)[0];
      a.options.strokeWeight = 3;
      a.options.geodesic = true;
      a.options.fillOpacity = 0.0;
      if (this.map1MouseOverCell && v.id === this.map1MouseOverCell.id) {
        a.options.fillOpacity = 0.5;
      }
      this.map1CellPolylines.push(a);
    });
  }

  mouseOverCellRow(c: CellLiteral): void {
    this.map1MouseOverCell = c;
    this.updateMap1Polylines();
  }

  mouseOutCellRow(c: CellLiteral): void {
    this.map1MouseOverCell = null;
    this.updateMap1Polylines();
  }

  clickGetChildren(c: CellLiteral): void {
    this.api.postChildCells(c.id).then(cells => {
      this.pushMap1Cells(...cells);
      this.updateMap1Polylines();
    });
  }

  get map1CellsFiltered(): Array<CellLiteral> {
    return this.map1Cells.filter(v => {
      if (!this.map1MinID && !this.map1MaxID) {
        return true;
      }
      if (!this.map1MinID && this.map1MaxID) {
        return v.id <= this.map1MaxID;
      }
      if (this.map1MinID && !this.map1MaxID) {
        return v.id >= this.map1MinID;
      }
      if (this.map1MinID && this.map1MaxID) {
        return v.id >= this.map1MinID && v.id <= this.map1MaxID;
      }
      return true;
    });
  }
}

import { Component, OnInit } from '@angular/core';

import { newPolylineFromGeoJSONPolygon, PolylineLiteral } from '../gmaputils';
import { ApiService } from 'src/app/api.service';
import { CellLiteral } from 'src/app/entity/s2';

interface Map1Data {
  cells: Array<CellLiteral>;
  polylines: Array<PolylineLiteral>;
}

@Component({
  selector: 'app-cell-union',
  templateUrl: './cell-union.component.html',
  styleUrls: ['./cell-union.component.scss']
})
export class CellUnionComponent implements OnInit {

  public codeCellUnionDefinition = `
  type CellUnion []CellID
  `;

  public codeRegionCovererDefinition = `
  type RegionCoverer struct {
    // 領域を埋め尽くすときに使用するCellの最小階層
    MinLevel int
    // 領域を埋め尽くすときに使用するCellの最大階層
    MaxLevel int
    // 領域を埋め尽くすときに使用するCellの階層の間隔
    // （LevelModで割った時にあまりが0となる階層だけを使用する）
    LevelMod int
    // 領域を埋め尽くすときに使用するCellの最大数
    MaxCells int
  }
  `;

  public map1RegionPolyline: PolylineLiteral;
  public map1Center: google.maps.LatLngLiteral;
  public map1RCUnionCell: Array<Map1Data>;
  public map1RCCovering: Array<Map1Data>;
  public map1RCFastCovering: Array<Map1Data>;
  public map1RCInteriorUnionCell: Array<Map1Data>;
  public map1RCInteriorCovering: Array<Map1Data>;
  public map1MinLevel: number;
  public map1MaxLevel: number;
  public map1LevelMod: number;
  public map1MaxCells: number;
  public map1Options: Array<string>;
  public map1SelectedOption: string;

  constructor(
    private api: ApiService,
  ) {
    this.map1RCUnionCell = [];
    this.map1RCCovering = [];
    this.map1RCFastCovering = [];
    this.map1RCInteriorUnionCell = [];
    this.map1RCInteriorCovering = [];
    this.map1Options = [
      'UnionCell',
      'Covering',
      'FastCovering',
      'InteriorUnionCell',
      'InteriorCovering',
    ];
    this.map1SelectedOption = 'UnionCell';
  }

  ngOnInit(): void {
    this.map1Center = {
      lat: 35.701528,
      lng: 139.6741809,
    };
    this.map1MinLevel = 0;
    this.map1MaxLevel = 20;
    this.map1LevelMod = 1;
    this.map1MaxCells = 100;
    this.map1UpdateRegionCoverer();
  }

  public get map1Cells(): Array<CellLiteral> {
    function ext(a: Map1Data[]): Array<CellLiteral> {
      const cells = [];
      a.forEach(v => {
        cells.push(...v.cells);
      });
      return cells;
    }
    if (this.map1SelectedOption === 'UnionCell') {
      return ext(this.map1RCUnionCell);
    }
    if (this.map1SelectedOption === 'Covering') {
      return ext(this.map1RCCovering);
    }
    if (this.map1SelectedOption === 'FastCovering') {
      return ext(this.map1RCFastCovering);
    }
    if (this.map1SelectedOption === 'InteriorUnionCell') {
      return ext(this.map1RCInteriorUnionCell);
    }
    if (this.map1SelectedOption === 'InteriorCovering') {
      return ext(this.map1RCInteriorCovering);
    }
    return [];
  }

  public get map1AvailableLevels(): Array<string> {
    const ret = [];
    for (let i = 0; i < this.map1MinLevel + 1; i++) {
      if (i % this.map1LevelMod !== 0) {
        continue;
      }
      ret.push(`${i}`);
    }
    return ret;
  }

  private map1UpdatePolylines(): void {
    function up1(s: Array<Map1Data>, o: google.maps.PolygonOptions): void {
      s.forEach(a => {
        a.polylines = [];
        a.cells.forEach(b => {
          const c = newPolylineFromGeoJSONPolygon(b.geoJson.geometry)[0];
          c.options = o;
          a.polylines.push(c);
        });
        a.cells.sort((x, y) => x.id < y.id ? -1 : 1);
      });
    }
    up1(this.map1RCUnionCell, {
      strokeWeight: 3,
      strokeColor: '#f00',
      geodesic: true,
      fillOpacity: 0.0,
    });
    up1(this.map1RCCovering, {
      strokeWeight: 3,
      strokeColor: '#0f0',
      geodesic: true,
      fillOpacity: 0.0,
    });
    up1(this.map1RCFastCovering, {
      strokeWeight: 3,
      strokeColor: '#00f',
      geodesic: true,
      fillOpacity: 0.0,
    });
    up1(this.map1RCInteriorUnionCell, {
      strokeWeight: 3,
      strokeColor: '#000',
      geodesic: true,
      fillOpacity: 0.0,
    });
    up1(this.map1RCInteriorCovering, {
      strokeWeight: 3,
      strokeColor: '#f0f',
      geodesic: true,
      fillOpacity: 0.0,
    });
  }

  map1ClickRegionCoverer(): void {
    this.map1UpdateRegionCoverer();
  }

  async map1UpdateRegionCoverer(): Promise<void> {
    this.map1RCUnionCell = [];
    this.map1RCCovering = [];
    this.map1RCFastCovering = [];
    this.map1RCInteriorUnionCell = [];
    this.map1RCInteriorCovering = [];
    return this.api.postCellUnionRegionCovererCellUnion(
      this.map1MinLevel,
      this.map1MaxLevel,
      this.map1LevelMod,
      this.map1MaxCells,
    ).then(v => {
      this.map1RegionPolyline = {
        path: v.Region,
        options: {
          strokeWeight: 1,
          geodesic: true,
        },
      };
      this.map1RCUnionCell.push({
        cells: v.CellUnion,
        polylines: [],
      });
      this.map1RCCovering.push({
        cells: v.Covering,
        polylines: [],
      });
      this.map1RCFastCovering.push({
        cells: v.FastCovering,
        polylines: [],
      });
      this.map1RCInteriorUnionCell.push({
        cells: v.InteriorCellUnion,
        polylines: [],
      });
      this.map1RCInteriorCovering.push({
        cells: v.InteriorCovering,
        polylines: [],
      });
      this.map1UpdatePolylines();
    });
  }

}

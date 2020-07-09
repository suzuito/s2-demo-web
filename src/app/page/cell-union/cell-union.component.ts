import { Component, OnInit } from '@angular/core';

import { data } from './shinjuku';
import { newPolylineFromGeoJSONPolygon, PolylineLiteral } from '../gmaputils';
import { ApiService } from 'src/app/api.service';
import { CellLiteral } from 'src/app/entity/s2';

@Component({
  selector: 'app-cell-union',
  templateUrl: './cell-union.component.html',
  styleUrls: ['./cell-union.component.scss']
})
export class CellUnionComponent implements OnInit {

  public codeCellUnionDefinition = `
  type CellUnion []CellID
  `;

  public map1RegionPolyline: PolylineLiteral;
  public map1Center: google.maps.LatLngLiteral;
  public map1RCCellUnionCells: Array<CellLiteral>;
  public map1RCCellUnionPolylines: Array<PolylineLiteral>;
  public map1RCCoveringCells: Array<CellLiteral>;
  public map1RCCoveringPolylines: Array<PolylineLiteral>;
  public map1RCFastCoveringCells: Array<CellLiteral>;
  public map1RCFastCoveringPolylines: Array<PolylineLiteral>;
  public map1RCInteriorCellUnionCells: Array<CellLiteral>;
  public map1RCInteriorCellUnionPolylines: Array<PolylineLiteral>;
  public map1RCInteriorCoveringCells: Array<CellLiteral>;
  public map1RCInteriorCoveringPolylines: Array<PolylineLiteral>;
  public map1MinLevel: number;
  public map1MaxLevel: number;
  public map1LevelMod: number;
  public map1MaxCells: number;

  constructor(
    private api: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.map1Center = {
      lat: 35.701528,
      lng: 139.6741809,
    };
    this.map1MinLevel = 10;
    this.map1MaxLevel = 15;
    this.map1LevelMod = 1;
    this.map1MaxCells = 100;
    this.map1RegionPolyline = newPolylineFromGeoJSONPolygon(data)[0];
    this.map1RegionPolyline.options.strokeWeight = 1;
    this.map1RegionPolyline.options.geodesic = true;
  }

  private map1UpdatePolylines(): void {
    this.map1RCCellUnionPolylines = [];
    this.map1RCCoveringPolylines = [];
    this.map1RCFastCoveringPolylines = [];
    this.map1RCInteriorCellUnionPolylines = [];
    this.map1RCInteriorCoveringPolylines = [];
    function up(s: Array<CellLiteral>, d: Array<PolylineLiteral>, o: google.maps.PolygonOptions): void {
      s.forEach(a => {
        const b = newPolylineFromGeoJSONPolygon(a.geoJson.geometry)[0];
        b.options = o;
        d.push(b);
      });
    }
    up(
      this.map1RCCellUnionCells,
      this.map1RCCellUnionPolylines,
      {
        strokeWeight: 3,
        strokeColor: '#f00',
        geodesic: true,
        fillOpacity: 0.0,
      },
    );
    up(
      this.map1RCCoveringCells,
      this.map1RCCoveringPolylines,
      {
        strokeWeight: 3,
        strokeColor: '#00f',
        geodesic: true,
        fillOpacity: 0.0,
      },
    );
    up(
      this.map1RCFastCoveringCells,
      this.map1RCFastCoveringPolylines,
      {
        strokeWeight: 3,
        strokeColor: '#0f0',
        geodesic: true,
        fillOpacity: 0.0,
      },
    );
    up(
      this.map1RCInteriorCellUnionCells,
      this.map1RCInteriorCellUnionPolylines,
      {
        strokeWeight: 3,
        strokeColor: '#000',
        geodesic: true,
        fillOpacity: 0.0,
      },
    );
    up(
      this.map1RCInteriorCoveringCells,
      this.map1RCInteriorCoveringPolylines,
      {
        strokeWeight: 3,
        strokeColor: '#f0f',
        geodesic: true,
        fillOpacity: 0.0,
      },
    );
  }

  map1ClickRegionCoverer(): void {
    this.map1RCCellUnionCells = [];
    this.map1RCCoveringCells = [];
    this.map1RCFastCoveringCells = [];
    this.map1RCInteriorCellUnionCells = [];
    this.map1RCInteriorCoveringCells = [];
    this.api.postCellUnionRegionCovererCellUnion(
      this.map1MinLevel,
      this.map1MaxLevel,
      this.map1LevelMod,
      this.map1MaxCells,
      this.map1RegionPolyline.path,
    ).then(v => {
      this.map1RCCellUnionCells.push(...v.CellUnion);
      this.map1RCCoveringCells.push(...v.Covering);
      this.map1RCFastCoveringCells.push(...v.FastCovering);
      this.map1RCInteriorCellUnionCells.push(...v.InteriorCellUnion);
      this.map1RCInteriorCoveringCells.push(...v.InteriorCovering);
      this.map1UpdatePolylines();
    });
  }

}

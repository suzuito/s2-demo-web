import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { S2Edge, S2LatLng, EdgeNew } from 'src/app/entity/s2';
import { ApiService } from 'src/app/api.service';

import {
  MarkerLiteral,
  PolylineLiteral,
  EdgeLiteral,
} from '../gmaputils';


@Component({
  selector: 'app-edge',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.scss']
})
export class EdgeComponent implements OnInit, AfterViewInit {

  public codeEdgeDefinition = `type Edge struct {
  V0, V1 Point
}`;

  public codeEdgeDistance = `// ll1とll2はa1.LatLng
p1 := s2.PointFromLatLng(ll1)
p2 := s2.PointFromLatLng(ll2)
length := p1.Distance(p2)`;

  @ViewChild('map1')
  public map1: google.maps.Map | undefined;
  public map1Markers: Array<MarkerLiteral>;
  public map1Polylines: Array<PolylineLiteral>;
  public map1Edges: Array<EdgeLiteral>;
  public map1S2EdgeNews: Array<EdgeNew>;

  constructor(
    private api: ApiService,
  ) {
    this.map1Markers = [];
    this.map1Polylines = [];
    this.map1Edges = [];
    this.map1S2EdgeNews = [];
  }

  ngOnInit(): void {
    this.map1Markers = [
      {
        position: {
          lat: 0, lng: 0,
        },
        options: {
          draggable: true,
          label: 'a',
        },
      },
      {
        position: {
          lat: 0, lng: 10,
        },
        options: {
          draggable: true,
          label: 'b',
        },
      },
      {
        position: {
          lat: 30, lng: 10,
        },
        options: {
          draggable: true,
          label: 'c',
        },
      },
      {
        position: {
          lat: 10, lng: 40,
        },
        options: {
          draggable: true,
          label: 'd',
        },
      },
    ];
    this.map1Edges = [
      { tail: 0, head: 1 },
      { tail: 2, head: 3 },
    ];
    this.map1Polylines = [
    ];
    this.map1UpdatePolylines();
  }

  ngAfterViewInit(): void {
  }

  clickMap1(v: google.maps.MouseEvent): void { }

  map1Marker(i: number): MarkerLiteral {
    return this.map1Markers[i];
  }
  map1EdgeNew(i: number): EdgeNew {
    return this.map1S2EdgeNews[i];
  }
  map1DragendMarker(e: google.maps.MouseEvent, i: number): void {
    this.map1Markers[i].position.lat = e.latLng.lat();
    this.map1Markers[i].position.lng = e.latLng.lng();
    this.map1UpdatePolylines();
  }
  private map1UpdatePolylines(): void {
    this.map1Polylines = [];
    this.map1S2EdgeNews = [];
    this.map1Edges.forEach(v => {
      const p: PolylineLiteral = {
        path: [
          this.map1Markers[v.tail].position,
          this.map1Markers[v.head].position,
        ],
        options: {
          geodesic: true,
        },
      };
      this.map1Polylines.push(p);

      this.api.getEdgeNew(p.path[0].lat, p.path[0].lng, p.path[1].lat, p.path[1].lng).then(e => {
        this.map1S2EdgeNews.push(e);
      });
    });
  }
}

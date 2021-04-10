import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { unitSphere, displayRotateY } from '../../threejs/sphere';
import { MarkerLiteral, CircleLiteral } from '../gmaputils';

import * as THREE from 'three';
import { S2Point } from 'src/app/entity/s2';
import { ApiService } from 'src/app/api.service';
import { Mesh } from 'three';

@Component({
  selector: 'app-distance',
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.scss']
})
export class DistanceComponent extends BaseComponent implements OnInit, AfterViewInit {

  public codeDistance = `a := s2.Point{}
b := s2.Point{}
// Distance関数の返り値の型はs1.Angle型である
distance := a.Distance(b)`;

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  @ViewChild('elUnitSphere')
  private elUnitSphere: ElementRef;

  private latlngs: Array<google.maps.LatLngLiteral>;
  private points: Array<S2Point>;
  private colors: Array<string>;
  public markers: Array<CircleLiteral>;
  private thLines: Array<THREE.Line>;
  private thLineDistance: THREE.Line;
  private thPoints: Array<THREE.Mesh>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
  ) {
    super(route, router);
    this.latlngs = [
      { lat: 0, lng: 0 },
      { lat: 0, lng: 100 },
    ];
    this.points = [];
    this.colors = [
      '#aa0000',
      '#00aa00',
    ];
    this.thLineDistance = new THREE.Line();
    this.updateMarkerLiteral();
  }

  ngOnInit(): void {
  }

  async ngAfterViewInit(): Promise<void> {
    [this.scene, this.camera, this.renderer] = unitSphere(
      this.elUnitSphere.nativeElement,
    );
    const thGroup = new THREE.Group();
    displayRotateY(this.scene, this.camera, this.renderer, thGroup);
    const thGeometrySphere = new THREE.SphereGeometry(
      0.05, 50, 50,
      0, Math.PI * 2,
      0, Math.PI * 2,
    );
    const thCenter = new THREE.Mesh(
      thGeometrySphere,
      new THREE.MeshBasicMaterial({
        color: 0xaaaaaa,
      }),
    );
    this.thPoints = [];
    thGroup.add(thCenter);
    this.thLines = [];
    this.thLineDistance = new THREE.Line();
    thGroup.add(this.thLineDistance);
    this.scene.add(thGroup);
    let i = 0;
    for (const l of this.latlngs) {
      const p = await this.api.getFnPointFromLatLng(l.lat, l.lng);
      this.points.push(p.point);
      const line = new THREE.Line();
      this.thLines.push(line);
      thGroup.add(line);
      const point = new Mesh(
        thGeometrySphere,
        new THREE.MeshBasicMaterial({
          color: this.colors[i++],
        }),
      );
      thGroup.add(point);
      this.thPoints.push(point);
    }
    this.updateThreeJSObjects();
  }

  private updateMarkerLiteral(): void {
    this.markers = this.latlngs.map((p, i) => {
      return {
        center: p,
        radius: 1,
        options: {
          draggable: true,
          strokeWeight: 15,
          strokeColor: this.colors[i],
        },
      } as CircleLiteral;
    });
  }

  private updateThreeJSObjects(): void {
    const g2 = new THREE.BufferGeometry();
    g2.setFromPoints([
      new THREE.Vector3(this.points[0].X, this.points[0].Y, this.points[0].Z),
      new THREE.Vector3(this.points[1].X, this.points[1].Y, this.points[1].Z),
    ]);
    this.thLineDistance.geometry = g2;
    this.points.forEach((p, i) => {
      const g1 = new THREE.BufferGeometry();
      g1.setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(p.X, p.Y, p.Z),
      ]);
      const l = this.thLines[i];
      l.geometry = g1;
      const point = this.thPoints[i];
      point.position.x = p.X;
      point.position.y = p.Y;
      point.position.z = p.Z;
    });
  }

  public async dragend(event: google.maps.MouseEvent, i: number): Promise<void> {
    this.latlngs[i].lat = event.latLng.lat();
    this.latlngs[i].lng = event.latLng.lng();
    this.updateMarkerLiteral();
    const p = await this.api.getFnPointFromLatLng(this.latlngs[i].lat, this.latlngs[i].lng);
    this.points[i] = p.point;
    this.updateThreeJSObjects();
  }

}

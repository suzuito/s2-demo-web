import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output } from '@angular/core';

import * as THREE from 'three';

import {
  ApiService,
} from '../../api.service';
import { S2Point, S2LatLng } from 'src/app/entity/s2';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { GitService } from 'src/app/git.service';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent extends BaseComponent implements OnInit, AfterViewInit {

  public codeAngleDefinition = `// ラジアン表現の角度
type Angle float64

// 度数表現の角度へ変換する
a := s1.Angle(math.Pi) // π
a.Degrees()            // 180
`;

  public angles: Array<number> = [
    0,
    Math.PI * (0.25),
    Math.PI * (0.5),
    Math.PI * (0.75),
    Math.PI,
    Math.PI * (1.25),
    Math.PI * (1.5),
    Math.PI * (1.75),
    Math.PI * 2,
  ];

  public code1 = `type LatLng struct {
  Lat, Lng s1.Angle
}`;

  public code2 = `package main

  import (
    "fmt"
  
    "github.com/golang/geo/s2"
  )
  
  func main() {
    latlng := s2.LatLngFromDegrees(35.6938, 139.7034)
    fmt.Printf("緯度=%f 経度=%f （ラジアン表現）\n", latlng.Lat, latlng.Lng)
    fmt.Printf("緯度=%f 経度=%f （度数表現）\n", latlng.Lat.Degrees(), latlng.Lng.Degrees())
  }
  `;

  public code3 = `type Point struct {
  r3.Vector
}`;

  public code4 = `type Vector struct {
  X, Y, Z float64
}`;

  public code5 = `// llはs2.LatLng構造体
p := s2.PointFromLatLng(ll)`;

  public codePointsDistance = `// ll1とll2はa1.LatLng
p1 := s2.PointFromLatLng(ll1)
p2 := s2.PointFromLatLng(ll2)
length := p1.Distance(p2)`;

  public clicked: google.maps.LatLngLiteral;
  public clickedAsPoint: S2Point | undefined;
  public clickedAsLatLng: S2LatLng | undefined;

  @ViewChild('elUnitSphere')
  public elUnitSphere: ElementRef | undefined;

  private renderer: THREE.WebGLRenderer | undefined;
  private scene: THREE.Scene | undefined;
  private camera: THREE.Camera | undefined;
  private clickedAsThreeObjectMesh: THREE.Mesh | undefined;
  private groupedPoint: THREE.Group | undefined;
  private clickedLine1: THREE.Line | undefined;
  private clickedLine2: THREE.Line | undefined;
  private clickedLine3: THREE.Line | undefined;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super(route, router);
    this.clicked = {
      lat: -1,
      lng: -1,
    };
    this.renderer = undefined;
    this.clickedLine1 = undefined;
    this.clickedLine2 = undefined;
    this.clickedLine3 = undefined;
  }

  ngOnInit(): void {
    super.OnInit();
  }

  ngAfterViewInit(): void {
    super.AfterViewInit();
    // Unit sphere
    if (this.elUnitSphere === undefined) {
      throw new Error('elUnitSphere is undefined');
    }
    const el = this.elUnitSphere.nativeElement as HTMLElement;
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      20,
      1,
      0.1,
      1000,
    );
    const width = 500;
    const height = 500;
    this.renderer.setSize(width, height);
    const geometry = new THREE.WireframeGeometry(
      new THREE.SphereGeometry(
        1, 50, 50,
        0,
        Math.PI * 2,
        0,
        Math.PI * 2,
      ),
    );
    const sphere = new THREE.LineSegments(
      geometry,
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth: 0.1,
        linecap: 'round',
        linejoin: 'round',
        opacity: 0.1,
        transparent: true,
      }),
    );
    this.scene.add(sphere);

    const clickedAsThreeObject = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const clickedAsThreeObjectMaterial = new THREE.MeshNormalMaterial();
    this.clickedAsThreeObjectMesh = new THREE.Mesh(
      clickedAsThreeObject,
      clickedAsThreeObjectMaterial,
    );
    this.clickedLine1 = new THREE.Line();
    this.clickedLine2 = new THREE.Line();
    this.clickedLine3 = new THREE.Line();
    this.groupedPoint = new THREE.Group();
    this.groupedPoint.add(this.clickedAsThreeObjectMesh);
    this.groupedPoint.add(this.clickedLine1);
    this.groupedPoint.add(this.clickedLine2);
    this.groupedPoint.add(this.clickedLine3);
    this.scene.add(this.groupedPoint);

    this.camera.position.z = 10;
    el.appendChild(this.renderer.domElement);

    let rotationY = 0;
    setInterval(
      () => {
        rotationY += 0.01;
        sphere.rotation.y = rotationY;
        if (this.groupedPoint === undefined) {
          throw new Error('groupedPoint is undefined');
        }
        if (this.clickedAsThreeObjectMesh === undefined) {
          throw new Error('clickedAsThreeObjectMesh is undefined');
        }
        if (this.clickedLine1 === undefined) {
          throw new Error('clickedLine1 is undefined');
        }
        if (this.renderer === undefined) {
          throw new Error('renderer is undefined');
        }
        if (this.scene === undefined) {
          throw new Error('scene is undefined');
        }
        if (this.camera === undefined) {
          throw new Error('camera is undefined');
        }
        this.groupedPoint.rotation.y = rotationY;
        const g1 = new THREE.BufferGeometry();
        g1.setFromPoints(
          [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(
              this.clickedAsThreeObjectMesh.position.x,
              this.clickedAsThreeObjectMesh.position.y,
              this.clickedAsThreeObjectMesh.position.z,
            ),
          ]
        )
        this.clickedLine1.geometry = g1;
        this.renderer.render(this.scene, this.camera);
      },
      100,
    );
  }

  async clickMap1(v: google.maps.MouseEvent): Promise<void> {
    if (this.clickedAsThreeObjectMesh === undefined) {
      throw new Error('clickedAsThreeObjectMesh is undefined');
    }
    const ll = v.latLng;
    const pair = await this.api.getFnPointFromLatLng(ll.lat(), ll.lng());
    this.clicked = {
      lat: ll.lat(),
      lng: ll.lng(),
    };
    this.clickedAsPoint = pair.point;
    this.clickedAsThreeObjectMesh.position.x = pair.point.Y;
    this.clickedAsThreeObjectMesh.position.y = pair.point.Z;
    this.clickedAsThreeObjectMesh.position.z = pair.point.X;
    this.clickedAsLatLng = pair.latlng;
  }

  public degree(a: number): number {
    return a * (180 / Math.PI);
  }
}

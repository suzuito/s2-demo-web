import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import * as THREE from 'three';

import {
  ApiService,
} from '../../api.service';
import { S2Point, S2LatLng } from 'src/app/entity/s2';
import { LineBasicMaterial } from 'three';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent implements OnInit, AfterViewInit {

  public code1 = `
  type LatLng struct {
    Lat, Lng s1.Angle
  }
  `;

  public code2 = `
  // LatLng構造体の初期化
  ll := s2.LatLngFromDegrees(35.6804, 139.7690)
  `;

  public code3 = `
  type Point struct {
    r3.Vector
  }
  `;

  public code4 = `
  type Vector struct {
    X, Y, Z float64
  }
  `;

  public code5 = `
  // llはs2.LatLng構造体
  p := s2.PointFromLatLng(ll)
  `;

  public clicked: google.maps.LatLngLiteral;
  public clickedAsPoint: S2Point;
  public clickedAsLatLng: S2LatLng;

  @ViewChild('elUnitSphere')
  public elUnitSphere: ElementRef;

  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private clickedAsThreeObjectMesh: THREE.Mesh;
  private groupedPoint: THREE.Group;
  private clickedLine1: THREE.Line;
  private clickedLine2: THREE.Line;
  private clickedLine3: THREE.Line;

  constructor(
    private api: ApiService,
  ) {
    this.clicked = {
      lat: -1,
      lng: -1,
    };
    this.renderer = null;
    this.clickedLine1 = null;
    this.clickedLine2 = null;
    this.clickedLine3 = null;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Unit sphere
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
        1, 50, 50, 0,
        Math.PI * 2, 0, Math.PI * 2,
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
        this.groupedPoint.rotation.y = rotationY;
        const g1 = new THREE.Geometry();
        g1.vertices.push(new THREE.Vector3(
          0,
          0,
          0,
        ));
        g1.vertices.push(new THREE.Vector3(
          this.clickedAsThreeObjectMesh.position.x,
          this.clickedAsThreeObjectMesh.position.y,
          this.clickedAsThreeObjectMesh.position.z,
        ));
        this.clickedLine1.geometry = g1;
        // const g2 = new THREE.Geometry();
        // g2.vertices.push(new THREE.Vector3(
        //   0,
        //   0,
        //   0,
        // ));
        // g2.vertices.push(new THREE.Vector3(
        //   this.clickedAsThreeObjectMesh.position.x,
        //   0,
        //   this.clickedAsThreeObjectMesh.position.z,
        // ));
        // this.clickedLine2.geometry = g2;
        // const g3 = new THREE.Geometry();
        // g3.vertices.push(new THREE.Vector3(
        //   0,
        //   0,
        //   0,
        // ));
        // g3.vertices.push(new THREE.Vector3(
        //   0,
        //   this.clickedAsThreeObjectMesh.position.y,
        //   this.clickedAsThreeObjectMesh.position.z,
        // ));
        // this.clickedLine3.geometry = g3;
        this.renderer.render(this.scene, this.camera);
      },
      100,
    );
  }

  async clickMap1(v: google.maps.MouseEvent): Promise<void> {
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

}

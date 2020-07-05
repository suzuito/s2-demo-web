import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent implements OnInit {

  public clicked: google.maps.LatLngLiteral;

  constructor() {
    this.clicked = {
      lat: -1,
      lng: -1,
    };
  }

  ngOnInit(): void {
  }

  clickMap1(v: google.maps.MouseEvent): void {
    const ll = v.latLng;
    this.clicked = {
      lat: ll.lat(),
      lng: ll.lng(),
    };
  }

}

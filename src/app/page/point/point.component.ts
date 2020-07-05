import { Component, OnInit } from '@angular/core';

import {
  ApiService,
} from '../../api.service';
import { S2Point } from 'src/app/entity/s2';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent implements OnInit {

  public clicked: google.maps.LatLngLiteral;
  public clickedAsPoint: S2Point;

  constructor(
    private api: ApiService,
  ) {
    this.clicked = {
      lat: -1,
      lng: -1,
    };
  }

  ngOnInit(): void {
  }

  async clickMap1(v: google.maps.MouseEvent): Promise<void> {
    const ll = v.latLng;
    const p = await this.api.getFnPointFromLatLng(ll.lat(), ll.lng());
    this.clicked = {
      lat: ll.lat(),
      lng: ll.lng(),
    };
    this.clickedAsPoint = p;
  }

}

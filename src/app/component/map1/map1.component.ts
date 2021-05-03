import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { GitService } from 'src/app/git.service';
import { AvailableGoogleMapDLStyle, newGoogleMapDLStyle } from 'src/app/gmap/data_layer_style';

@Component({
  selector: 'app-map1',
  templateUrl: './map1.component.html',
  styleUrls: ['./map1.component.scss']
})
export class Map1Component implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('m')
  m: GoogleMap | undefined;

  @Input()
  mstyle: string;

  @Input()
  center: google.maps.LatLngLiteral;

  @Input()
  zoom: number;

  @Input()
  fc: GeoJSON.FeatureCollection | undefined;

  constructor(
  ) {
    this.mstyle = '';
    this.center = { lat: 0, lng: 0 };
    this.zoom = 5;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.fc) {
      this.redisplay();
    }
    if (changes.center) {
      this.redisplay();
    }
  }

  async ngAfterViewInit(): Promise<void> {
    this.redisplay();
  }

  private redisplay(): void {
    if (this.fc === undefined) {
      return;
    }
    if (this.m === undefined) {
      return;
    }
    if (this.mstyle !== '') {
      this.m.data.setStyle(newGoogleMapDLStyle(this.mstyle).rule);
    }
    this.m.options = {
      center: this.center,
      zoom: this.zoom,
    };
    this.m.data.addGeoJson(this.fc);
  }

}

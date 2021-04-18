import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { GitService } from 'src/app/git.service';
import { AvailableGoogleMapDLStyle, newGoogleMapDLStyle } from 'src/app/gmap/data_layer_style';

@Component({
  selector: 'app-map1',
  templateUrl: './map1.component.html',
  styleUrls: ['./map1.component.scss']
})
export class Map1Component implements OnInit, AfterViewInit {

  @ViewChild('m')
  m: GoogleMap | undefined;

  @Input()
  path: string;

  @Input()
  mstyle: string;

  @Input()
  center: google.maps.LatLngLiteral;

  constructor(
    private gitService: GitService,
  ) {
    this.path = '';
    this.mstyle = '';
    this.center = { lat: 0, lng: 0 };
  }

  ngOnInit(): void {
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.m === undefined) {
      throw new Error('this.m is undefined');
    }
    if (this.path === '') {
      throw new Error('this.path is empty string');
    }
    if (this.mstyle !== '') {
      this.m.data.setStyle(newGoogleMapDLStyle(this.mstyle).rule);
    }
    this.m.options = {
      // center: { lat: 36.2048, lng: 138.2529 },
      center: this.center,
      zoom: 5,
    };
    this.m.data.addGeoJson(await this.gitService.getGeoJSON(this.path));
  }

}

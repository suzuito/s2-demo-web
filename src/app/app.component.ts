import { Component, OnInit } from '@angular/core';
import { GoogleMapScriptLoaderService } from './google-map-script-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private ggml: GoogleMapScriptLoaderService,
  ) { }

  ngOnInit() {
    this.ggml.init();
  }
}

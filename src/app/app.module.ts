import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import {
  HttpClientModule,
} from '@angular/common/http';

import {
  MatSidenavModule,
} from '@angular/material/sidenav';
import {
  MatListModule,
} from '@angular/material/list';
import {
  MatCardModule,
} from '@angular/material/card';

import { HighlightModule } from 'ngx-highlightjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopComponent } from './page/top/top.component';
import { SummaryComponent } from './page/summary/summary.component';
import { PointComponent } from './page/point/point.component';
import { RegionRectComponent } from './page/region-rect/region-rect.component';
import { EdgeComponent } from './page/edge/edge.component';


@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    SummaryComponent,
    PointComponent,
    RegionRectComponent,
    EdgeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HighlightModule,
    GoogleMapsModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

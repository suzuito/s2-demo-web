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
import {
  MatButtonModule,
} from '@angular/material/button';
import {
  MatInputModule,
} from '@angular/material/input';
import {
  MatFormFieldModule,
} from '@angular/material/form-field';
import {
  MatCheckboxModule,
} from '@angular/material/checkbox';
import {
  MatSelectModule,
} from '@angular/material/select';

import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import * as hljs from 'highlight.js';
(document.defaultView as any).hljs = hljs;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopComponent } from './page/top/top.component';
import { SummaryComponent } from './page/summary/summary.component';
import { PointComponent } from './page/point/point.component';
import { RegionRectComponent } from './page/region-rect/region-rect.component';
import { EdgeComponent } from './page/edge/edge.component';
import { CellComponent } from './page/cell/cell.component';
import { FormsModule } from '@angular/forms';
import { CellUnionComponent } from './page/cell-union/cell-union.component';
import { LinkComponent } from './component/link/link.component';
import { CellTableComponent } from './component/cell-table/cell-table.component';


export function getHighlightLanguages(): any {
  return {
    go: () => import('highlight.js/lib/languages/go'),
  };
}

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    SummaryComponent,
    PointComponent,
    RegionRectComponent,
    EdgeComponent,
    CellComponent,
    CellUnionComponent,
    LinkComponent,
    CellTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    HighlightModule,
    GoogleMapsModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: getHighlightLanguages(),
        lineNumbers: true,
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

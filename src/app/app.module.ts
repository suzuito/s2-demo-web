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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';

import { HighlightModule } from 'ngx-highlightjs';

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
import { HeadRefDirective } from './component/head-ref.directive';


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
    CellTableComponent,
    HeadRefDirective,
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
    MatToolbarModule,
    MatIconModule,
    MatTreeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

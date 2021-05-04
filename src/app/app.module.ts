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
import { MatDialogModule } from '@angular/material/dialog';

import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import * as hljs from 'highlight.js';
(document.defaultView as any).hljs = hljs;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopComponent } from './page/top/top.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './component/about/about.component';
import { SandboxComponent } from './page/sandbox/sandbox.component';
import { Map1Component } from './component/map1/map1.component';
import { ApiService } from './service/api.service';
import { HttpApiService } from './http/http-api.service';
import { IndexComponent } from './component/index/index.component';
import { ArticleComponent } from './page/article/article.component';
import { ArticleBlockComponent } from './page/article/article-block/article-block.component';
import { ArticleBlockMapComponent } from './page/article/article-block-map/article-block-map.component';


export function getHighlightLanguages(): any {
  return {
    go: () => import('highlight.js/lib/languages/go'),
  };
}

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    AboutComponent,
    SandboxComponent,
    Map1Component,
    IndexComponent,
    ArticleComponent,
    ArticleBlockComponent,
    ArticleBlockMapComponent,
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
    MatDialogModule,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: getHighlightLanguages(),
        lineNumbers: true,
      }
    },
    { provide: ApiService, useClass: HttpApiService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

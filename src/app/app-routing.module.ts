import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopComponent } from './page/top/top.component';
import { TopGuard } from './page/top/top.guard';
import { SummaryComponent } from './page/summary/summary.component';
import { PointComponent } from './page/point/point.component';
import { RegionRectComponent } from './page/region-rect/region-rect.component';
import { EdgeComponent } from './page/edge/edge.component';
import { CellComponent } from './page/cell/cell.component';
import { CellUnionComponent } from './page/cell-union/cell-union.component';
import { DistanceComponent } from './page/distance/distance.component';
import { RegionComponent } from './page/region/region.component';
import { SandboxComponent } from './page/sandbox/sandbox.component';
import { LatlngComponent } from './page/latlng/latlng.component';
import { GeometryComponent } from './page/geometry/geometry.component';
import { LoopComponent } from './page/loop/loop.component';
import { CcwComponent } from './page/ccw/ccw.component';
import { ArticleComponent } from './page/article/article.component';
import { ArticleGuard } from './page/article/article.guard';


const routes: Routes = [
  {
    path: '',
    component: TopComponent,
    canActivate: [
      TopGuard,
    ],
    children: [
      {
        path: 'article/:articleId',
        component: ArticleComponent,
        canActivate: [
          ArticleGuard,
        ],
      },
      {
        path: '',
        component: SummaryComponent,
      },
      {
        path: 'latlng',
        component: LatlngComponent,
      },
      {
        path: 'geometry',
        component: GeometryComponent,
      },
      {
        path: 'ccw',
        component: CcwComponent,
      },
      {
        path: 'point',
        component: PointComponent,
      },
      {
        path: 'loop',
        component: LoopComponent,
      },
      {
        path: 'edge',
        component: EdgeComponent,
      },
      {
        path: 'region_rect',
        component: RegionRectComponent,
      },
      {
        path: 'cell',
        component: CellComponent,
      },
      {
        path: 'cell_union',
        component: CellUnionComponent,
      },
      {
        path: 'distance',
        component: DistanceComponent,
      },
      {
        path: 'region',
        component: RegionComponent,
      },
      {
        path: 'sandbox',
        component: SandboxComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

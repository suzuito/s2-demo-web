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


const routes: Routes = [
  {
    path: '',
    component: TopComponent,
    canActivate: [
      TopGuard,
    ],
    children: [
      {
        path: '',
        component: SummaryComponent,
      },
      {
        path: 'point',
        component: PointComponent,
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
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

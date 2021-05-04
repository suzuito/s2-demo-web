import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopComponent } from './page/top/top.component';
import { TopGuard } from './page/top/top.guard';
import { SandboxComponent } from './page/sandbox/sandbox.component';
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
        // FIXME
        // Create Top page
        path: 'article',
        pathMatch: 'full',
        redirectTo: 'article/summary',
      },
      {
        // FIXME
        // Create Top page
        path: '',
        pathMatch: 'full',
        redirectTo: 'article/summary',
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

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ArticleService } from './article.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleGuard implements CanActivate {
  constructor(
    private articleService: ArticleService,
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    const articleId = route.params.articleId;
    if (!articleId) {
      return false;
    }
    try {
      this.articleService.articleId = articleId;
    } catch (e) {
      return false;
    }
    return true;
  }
}

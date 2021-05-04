import { Injectable } from '@angular/core';
import { ArticleListItem } from 'src/app/entity/article_list';
import { ApiService } from 'src/app/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class TopService {

  public index: ArticleListItem | undefined;

  constructor(
    private apiService: ApiService,
  ) {
  }

  async fetchIndex(): Promise<void> {
    this.index = await this.apiService.getIndex();
  }
}

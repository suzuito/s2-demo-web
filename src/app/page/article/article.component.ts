import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ArticleBlock } from 'src/app/entity/article';
import { PrintGeoJSONOption } from 'src/app/entity/result';
import { ArticleService } from './article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @ViewChild('m')
  m: GoogleMap | undefined;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private titleService: Title,
  ) {
    this.route.url.subscribe(v => {
      this.articleService.fetchArticle();
    });
    this.articleService.event.subscribe({
      next: (v) => {
        console.log(v);
        if (this.articleService.article === undefined) {
          return;
        }
        this.titleService.setTitle(`s2 Sandbox | ${this.articleService.article.title}`);
      },
    });
  }

  ngOnInit(): void {
  }

  get articleHTML(): SafeHtml | undefined {
    return this.articleService.articleHTML;
  }

  get blocks(): Array<ArticleBlock> {
    return this.articleService.blocks;
  }

  articleBlockHTML(blockId: string): SafeHtml {
    return this.articleService.getArticleBlockHTML(blockId);
  }

  articleBlockSourceCode(blockId: string): string {
    return this.articleService.getArticleBlockSourceCode(blockId);
  }

  articleBlockResultText(blockId: string): string {
    return this.articleService.getArticleBlockResultText(blockId);
  }

  articleBlockResultFeatureCollection(blockId: string): GeoJSON.FeatureCollection | undefined {
    return this.articleService.getArticleBlockResultFeatureCollection(blockId);
  }

  articleBlockResultPrintGeoJSONOption(blockId: string): PrintGeoJSONOption {
    return this.articleService.getArticleBlockResultPrintGeoJSONOption(blockId);
  }
}

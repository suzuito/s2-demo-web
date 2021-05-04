import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ArticleBlock } from 'src/app/entity/article';
import { PrintGeoJSONOption } from 'src/app/entity/result';
import { ApiService } from 'src/app/service/api.service';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-block',
  templateUrl: './article-block.component.html',
  styleUrls: ['./article-block.component.scss']
})
export class ArticleBlockComponent implements OnInit, AfterViewInit {

  @Input()
  public block: ArticleBlock | undefined;

  @ViewChild('m')
  public m: GoogleMap | undefined;

  public blockHTML: SafeHtml;
  public blockSourceCode: string;
  public blockResultText: string;

  public height: string;

  constructor(
    private articleService: ArticleService,
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
  ) {
    this.blockHTML = '';
    this.blockSourceCode = '';
    this.blockResultText = '';
    this.height = '0px';
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.block === undefined) {
      throw new Error('block is undefined');
    }
    const block = this.block;
    this.apiService.getArticleBlockHTML(this.articleService.articleId, block.id).then(v => {
      this.blockHTML = this.sanitizer.bypassSecurityTrustHtml(v);
    });
    this.apiService.getArticleBlockSourceCode(this.articleService.articleId, block.id).then(v => {
      this.blockSourceCode = v;
    });
    this.apiService.getArticleBlockResultText(this.articleService.articleId, block.id).then(v => {
      this.blockResultText = v;
    });
    this.apiService.getArticleBlockResultPrintGeoJSONOption(this.articleService.articleId, block.id).then(o => {
      return this.apiService.getArticleBlockResultFeatureCollection(this.articleService.articleId, block.id).then(v => {
        if (this.m === undefined) {
          return;
        }
        this.height = v.features.length > 0 ? o.styleHeight : '0px';
        this.m.options = {
          center: o.center,
          zoom: o.zoom,
        };
        this.m.data.addGeoJson(v);
        return;
      });
    });
  }
}

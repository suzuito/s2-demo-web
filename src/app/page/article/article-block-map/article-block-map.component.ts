import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-block-map',
  templateUrl: './article-block-map.component.html',
  styleUrls: ['./article-block-map.component.scss']
})
export class ArticleBlockMapComponent implements OnInit, AfterViewInit {

  @Input()
  public blockId: string;

  @ViewChild('m')
  public m: GoogleMap | undefined;

  constructor(
    private articleService: ArticleService,
  ) {
    this.blockId = '';
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  ngAfterViewInit(): void {
    if (this.m === undefined) {
      throw new Error('m is undefined');
    }
    this.redisplay();
  }

  private redisplay(): void {
    if (this.m === undefined) {
      return;
    }
    const opt = this.articleService.getArticleBlockResultPrintGeoJSONOption(this.blockId);
    console.log(this.blockId, opt);
    this.m.height = opt.styleHeight;
    this.m.options = {
      center: opt.center,
    };
  }

}

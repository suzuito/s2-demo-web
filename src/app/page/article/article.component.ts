import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ArticleBlock } from 'src/app/entity/article';
import { PrintGeoJSONOption } from 'src/app/entity/result';
import { LdJSONGenerator, LdJsonService } from 'src/app/ld-json.service';
import { MetaService, NewMetas, SiteLocale, SiteOrigin, SiteName } from 'src/app/meta.service';
import { ArticleService } from './article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @ViewChild('m')
  m: GoogleMap | undefined;

  public ldJSONGenerator: LdJSONGenerator;

  constructor(
    private articleService: ArticleService,
    private ldJSONService: LdJsonService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: MetaService,
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
        const siteUrl = `${SiteOrigin}${location.pathname}`;
        const siteTitle = `${SiteName} | ${this.articleService.article.title}`;
        this.titleService.setTitle(siteTitle);
        this.metaService.setMetas(NewMetas({
          ogTitle: this.articleService.article.title,
          ogLocale: SiteLocale,
          ogDescription: this.articleService.article.description,
          ogUrl: siteUrl,
          ogSiteName: SiteName,
          ogType: 'article',
          description: this.articleService.article.description,
          ogImage: `https://${SiteOrigin}/assets/ss.jpg`, // FIXME
        }));
        this.ldJSONGenerator.addWebPage(
          siteUrl,
          SiteName,
          siteTitle,
          this.articleService.article.description,
        );
      },
    });
    this.ldJSONGenerator = this.ldJSONService.generator();
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

  get ldJSON(): SafeHtml {
    return this.ldJSONGenerator.generate();
  }
}

import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Article, ArticleBlock } from 'src/app/entity/article';
import { PrintGeoJSONOption } from 'src/app/entity/result';
import { ApiService } from 'src/app/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public loading: boolean;

  public articleId: string;
  public article: Article | undefined;
  public articleHTML: SafeHtml | undefined;

  private articleBlocksHTML: Map<string, SafeHtml>;
  private articleBlocksSourceCode: Map<string, string>;
  private articleBlocksResultText: Map<string, string>;
  private articleBlocksResultFeatureCollection: Map<string, GeoJSON.FeatureCollection>;
  private articleBlocksResultPrintGeoJSONOption: Map<string, PrintGeoJSONOption>;

  constructor(
    private api: ApiService,
    private sanitizer: DomSanitizer,
  ) {
    this.loading = false;
    this.articleId = '';
    this.articleBlocksHTML = new Map<string, SafeHtml>();
    this.articleBlocksSourceCode = new Map<string, string>();
    this.articleBlocksResultText = new Map<string, string>();
    this.articleBlocksResultFeatureCollection = new Map<string, GeoJSON.FeatureCollection>();
    this.articleBlocksResultPrintGeoJSONOption = new Map<string, PrintGeoJSONOption>();
  }

  clear(): void {
    this.articleBlocksHTML = new Map<string, SafeHtml>();
    this.articleBlocksSourceCode = new Map<string, string>();
    this.articleBlocksResultText = new Map<string, string>();
    this.articleBlocksResultFeatureCollection = new Map<string, GeoJSON.FeatureCollection>();
    this.articleBlocksResultPrintGeoJSONOption = new Map<string, PrintGeoJSONOption>();
    this.article = undefined;
    this.articleHTML = '';
  }

  async fetchArticle(): Promise<void> {
    this.article = await this.api.getArticle(this.articleId);
    this.articleHTML = this.sanitizer.bypassSecurityTrustHtml(await this.api.getArticleHTML(this.articleId));
  }

  async fetch(): Promise<void> {
    if (this.loading) {
      return;
    }
    this.loading = true;
    try {
      this.clear();
      this.article = await this.api.getArticle(this.articleId);
      const a = this.article;
      this.articleHTML = this.sanitizer.bypassSecurityTrustHtml(await this.api.getArticleHTML(a.id));
      for (const block of this.article.blocks) {
        this.articleBlocksHTML.set(
          block.id,
          this.sanitizer.bypassSecurityTrustHtml(await this.api.getArticleBlockHTML(a.id, block.id)),
        );
        this.articleBlocksSourceCode.set(block.id, await this.api.getArticleBlockSourceCode(a.id, block.id));
        this.articleBlocksResultText.set(block.id, await this.api.getArticleBlockResultText(a.id, block.id));
        this.articleBlocksResultFeatureCollection.set(block.id, await this.api.getArticleBlockResultFeatureCollection(a.id, block.id));
        this.articleBlocksResultPrintGeoJSONOption.set(block.id, await this.api.getArticleBlockResultPrintGeoJSONOption(a.id, block.id));
      }
    } finally {
      this.loading = false;
    }
  }

  get blocks(): Array<ArticleBlock> {
    if (this.article === undefined) {
      return [];
    }
    return this.article.blocks;
  }

  getArticleBlockHTML(blockId: string): SafeHtml {
    const v = this.articleBlocksHTML.get(blockId);
    if (v === undefined) {
      return '';
    }
    return v;
  }

  getArticleBlockSourceCode(blockId: string): string {
    const v = this.articleBlocksSourceCode.get(blockId);
    if (v === undefined) {
      return '';
    }
    return v;
  }

  getArticleBlockResultText(blockId: string): string {
    const v = this.articleBlocksResultText.get(blockId);
    if (v === undefined) {
      return '';
    }
    return v;
  }

  getArticleBlockResultFeatureCollection(blockId: string): GeoJSON.FeatureCollection | undefined {
    return this.articleBlocksResultFeatureCollection.get(blockId);
  }

  getArticleBlockResultPrintGeoJSONOption(blockId: string): PrintGeoJSONOption {
    const v = this.articleBlocksResultPrintGeoJSONOption.get(blockId);
    if (v === undefined) {
      return {
        styleHeight: '500px',
        zoom: 5,
        center: { lat: 0, lng: 0 },
      };
    }
    return v;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeatureCollection } from 'geojson';
import { environment } from 'src/environments/environment';
import { Article } from '../entity/article';
import { ArticleListItem } from '../entity/article_list';
import { emptyFeatureCollection } from '../entity/geojson';
import { defaultPrintGeoJSONOption, PrintGeoJSONOption } from '../entity/result';
import { ApiService } from '../service/api.service';
import { OptBuilder, responseAllowHTTPError } from './common';

function u(origin: string, path: string): string {
  return `${origin}${path}`;
}

@Injectable({
  providedIn: 'root'
})
export class HttpApiService extends ApiService {

  constructor(private http: HttpClient) {
    super();
  }

  async getIndex(): Promise<ArticleListItem> {
    return this.http.get(
      u(environment.urlArticleStorage, '/index.json'),
      new OptBuilder()
        .jsonResponseBody()
        .gen(),
    ).toPromise().then((v: any) => v);
  }

  async getArticle(articleId: string): Promise<Article> {
    return this.http.get(
      u(environment.urlArticleStorage, `/${articleId}/article.json`),
      new OptBuilder()
        .jsonResponseBody()
        .gen(),
    ).toPromise().then((v: any) => v);
  }

  async getArticleHTML(articleId: string): Promise<string> {
    return this.http.get(
      u(environment.urlArticleStorage, `/${articleId}/article.html`),
      new OptBuilder()
        .textResponseBody()
        .gen(),
    ).toPromise().then((v: any) => v);
  }

  async getArticleBlockHTML(articleId: string, blockId: string): Promise<string> {
    return this.http.get(
      u(environment.urlArticleStorage, `/${articleId}/${blockId}/article.html`),
      new OptBuilder()
        .textResponseBody()
        .gen(),
    ).toPromise().then((v: any) => v);
  }

  async getArticleBlockSourceCode(articleId: string, blockId: string): Promise<string> {
    return this.http.get(
      u(environment.urlArticleStorage, `/${articleId}/${blockId}/main.go`),
      new OptBuilder()
        .textResponseBody()
        .gen(),
    ).toPromise().then((v: any) => v).catch(responseAllowHTTPError<string>([404], ''));
  }

  async getArticleBlockResultText(articleId: string, blockId: string): Promise<string> {
    return this.http.get(
      u(environment.urlArticleStorage, `/${articleId}/${blockId}/result.txt`),
      new OptBuilder()
        .textResponseBody()
        .gen(),
    ).toPromise().then((v: any) => v).catch(responseAllowHTTPError<string>([404], ''));
  }

  async getArticleBlockResultFeatureCollection(articleId: string, blockId: string): Promise<FeatureCollection> {
    return this.http.get(
      u(environment.urlArticleStorage, `/${articleId}/${blockId}/result.geojson`),
      new OptBuilder()
        .jsonResponseBody()
        .gen(),
    ).toPromise().then((v: any) => v).catch(responseAllowHTTPError<GeoJSON.FeatureCollection>([404], emptyFeatureCollection));
  }

  async getArticleBlockResultPrintGeoJSONOption(articleId: string, blockId: string): Promise<PrintGeoJSONOption> {
    return this.http.get(
      u(environment.urlArticleStorage, `/${articleId}/${blockId}/result.geojson.option.json`),
      new OptBuilder()
        .jsonResponseBody()
        .gen(),
    ).toPromise().then((v: any) => v).catch(responseAllowHTTPError<PrintGeoJSONOption>([404], defaultPrintGeoJSONOption));
  }
}

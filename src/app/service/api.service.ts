import { FeatureCollection } from 'geojson';
import { Article } from '../entity/article';
import { ArticleListItem } from '../entity/article_list';
import { PrintGeoJSONOption } from '../entity/result';

export abstract class ApiService {
    abstract getIndex(): Promise<ArticleListItem>;
    abstract getArticle(articleId: string): Promise<Article>;
    abstract getArticleHTML(articleId: string): Promise<string>;
    abstract getArticleBlockHTML(articleId: string, blockId: string): Promise<string>;
    abstract getArticleBlockSourceCode(articleId: string, blockId: string): Promise<string>;
    abstract getArticleBlockResultText(articleId: string, blockId: string): Promise<string>;
    abstract getArticleBlockResultFeatureCollection(articleId: string, blockId: string): Promise<FeatureCollection>;
    abstract getArticleBlockResultPrintGeoJSONOption(articleId: string, blockId: string): Promise<PrintGeoJSONOption>;
}

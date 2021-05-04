
export interface Article {
    id: string;
    title: string;
    description: string;
    text: string;
    blocks: Array<ArticleBlock>;
    publishedAt: number;
    draft: boolean;
}

export enum ArticleBlockType {
    Text = 'text',
    SourceAndText = 'source_and_text',
}

export interface ArticleBlock {
    id: string;
    type: ArticleBlockType;
    pathText: string;
    pathSource: string;
    pathSourceResult: string;
    pathSourceResultGeoJSON: string;
}
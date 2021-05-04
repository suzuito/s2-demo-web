
export interface ArticleListItem {
    articleId: string;
    anchor: string;
    name: string;
    children: Array<ArticleListItem>;
}

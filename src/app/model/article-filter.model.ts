export interface ArticleFilter {
  limit?: number;
  offset?: number;
  feed?: string;
  tag?: string;
  author?: string;
  favorited?: string;
}

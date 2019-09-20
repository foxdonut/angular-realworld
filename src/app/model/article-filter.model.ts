export interface ArticleFilter {
  limit?: number;
  offset?: number;
  feed?: boolean;
  tag?: string;
  author?: string;
  favorited?: string;
}

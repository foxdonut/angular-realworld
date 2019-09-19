import { Profile } from './profile.model';

export interface Article {
  author: Profile;
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  title: string;
  description: string;
  tagList: string[];
  body: string;
}

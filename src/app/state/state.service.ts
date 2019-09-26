import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import mergerino from 'mergerino';
import { ArticleFilter } from '../model/article-filter.model';
import { User } from '../model/user.model';
import { ApiService } from '../api/api.service';
import { Article } from '../model/article.model';
import { Profile } from '../model/profile.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  user: User;

  articleFilter = new BehaviorSubject<ArticleFilter>({
    limit: 10,
    offset: 0,
    tag: '',
    feed: false
  });

  constructor(private api: ApiService) { }

  async load(): Promise<User> {
    const user = await this.api.getUser();
    this.user = user;
    return user;
  }

  getArticleFilter() {
    return this.articleFilter.getValue();
  }

  updateArticleFilter(update: ArticleFilter) {
    this.articleFilter.next(mergerino({}, this.articleFilter.getValue(), update));
  }

  toggleFavoriteArticle(article: Article) {
    this.api.toggleFavoriteArticle(article).subscribe((updatedArticle: Article) => {
      article.favorited = updatedArticle.favorited;
      article.favoritesCount = updatedArticle.favoritesCount;
    });
  }

  toggleFollowProfile(profile: Profile) {
    this.api.toggleFollowProfile(profile).subscribe((updatedProfile: Profile) => {
      profile.following = updatedProfile.following;
    });
  }
}

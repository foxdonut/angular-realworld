import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import mergerino from 'mergerino';
import { ArticleFilter } from '../model/article-filter.model';
import { User } from '../model/user.model';
import { ApiService } from '../api/api.service';

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
}

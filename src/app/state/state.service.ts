import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import mergerino from 'mergerino';
import { ArticleFilter } from '../model/article-filter.model';
import { User } from '../model/user.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  articleFilter = new BehaviorSubject<ArticleFilter>({
    limit: 10,
    offset: 0,
    tag: '',
    feed: false
  });

  user = new BehaviorSubject<User>(null);

  constructor(private api: ApiService) {
    this.api.getUser().then((user: User) => {
      this.user.next(user);
    });
  }

  getArticleFilter() {
    return this.articleFilter.getValue();
  }

  updateArticleFilter(update: ArticleFilter) {
    this.articleFilter.next(mergerino({}, this.articleFilter.getValue(), update));
  }
}

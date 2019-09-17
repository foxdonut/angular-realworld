import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import mergerino from 'mergerino';
import { ArticleFilter } from '../model/article-filter.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  articleFilter = new BehaviorSubject<ArticleFilter>({
    limit: 10,
    offset: 0,
    tag: '',
    feed: ''
  });

  constructor() { }

  getArticleFilter() {
    return this.articleFilter.getValue();
  }

  updateArticleFilter(update: any) {
    this.articleFilter.next(mergerino({}, this.articleFilter.getValue(), update));
  }
}

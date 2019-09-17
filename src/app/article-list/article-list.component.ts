import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { StateService } from '../state/state.service';
import { ArticleFilter } from '../model/article-filter.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styles: []
})
export class ArticleListComponent implements OnInit {
  loading = true;
  articles: any = [];
  articlesCount = 0;

  constructor(private state: StateService, private api: ApiService) { }

  ngOnInit() {
    this.state.articleFilter.subscribe((filter: ArticleFilter) => {
      this.loading = true;

      this.api.getArticles(filter).subscribe((response: any) => {
        this.articles = response.articles;
        this.articlesCount = response.articlesCount;
        this.loading = false;
      });
    });
  }
}

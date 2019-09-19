import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { StateService } from '../state/state.service';
import { ArticleFilter } from '../model/article-filter.model';
import { Article } from '../model/article.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styles: []
})
export class ArticleListComponent implements OnInit {
  loading = true;
  articles: any = [];
  articlesCount = 0;

  constructor(private state: StateService, private api: ApiService, private router: Router) { }

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

  onToggleArticleFavorite(article: Article): void {
    if (this.state.isUserLoggedIn()) {
    } else {
      this.router.navigate(['/login']);
    }
  }
}

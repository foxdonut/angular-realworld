import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api/api.service';
import { StateService } from '../state/state.service';
import { ArticleFilter } from '../model/article-filter.model';
import { ArticleList } from '../model/article-list.model';
import { Article } from '../model/article.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styles: []
})
export class ArticleListComponent implements OnInit, OnDestroy {
  articleFilterSubscription: Subscription;

  loading = true;
  articles: any = [];
  articlesCount = 0;

  constructor(private state: StateService, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.articleFilterSubscription = this.state.articleFilter.subscribe((filter: ArticleFilter) => {
      console.log('- filter changed:', JSON.stringify(filter));
      this.loading = true;

      this.api.getArticles(filter).subscribe((articleList: ArticleList) => {
        this.articles = articleList.articles;
        this.articlesCount = articleList.articlesCount;
        this.loading = false;
      });
    });
  }

  ngOnDestroy() {
    this.articleFilterSubscription.unsubscribe();
  }

  onToggleArticleFavorite(article: Article): void {
    if (this.state.isUserLoggedIn()) {
    } else {
      this.router.navigate(['/login']);
    }
  }
}

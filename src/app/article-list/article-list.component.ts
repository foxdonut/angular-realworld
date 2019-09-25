import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api/api.service';
import { StateService } from '../state/state.service';
import { ArticleFilter } from '../model/article-filter.model';
import { ArticleList } from '../model/article-list.model';
import { Article } from '../model/article.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WithUserComponent } from '../with-user/with-user.component';
import { defaultImage } from '../model/constants.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styles: []
})
export class ArticleListComponent extends WithUserComponent implements OnInit, OnDestroy {
  defaultImage: string;
  articleFilterSubscription: Subscription;

  loading = true;
  articles: any = [];
  articlesCount = 0;

  constructor(state: StateService, private api: ApiService, private router: Router) {
    super(state);
  }

  ngOnInit() {
    this.defaultImage = defaultImage;

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
    if (this.getUser()) {
      this.api.toggleFavoriteArticle(article).subscribe((updatedArticle: Article) => {
        this.state.updateArticleFilter({});
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}

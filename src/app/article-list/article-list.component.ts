import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styles: []
})
export class ArticleListComponent implements OnInit {
  loading = true;
  articles: any = [];
  articlesCount = 0;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getArticles({}).subscribe((response: any) => {
      this.articles = response.articles;
      this.articlesCount = response.articlesCount;
      this.loading = false;
    });
  }
}

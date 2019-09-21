import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Article } from '../model/article.model';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styles: []
})
export class ArticleEditComponent implements OnInit {
  articleForm: FormGroup;
  article: Article;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.article = { title: null, description: null, body: null, tagList: [], author: null,
      createdAt: null, updatedAt: null, slug: null, favorited: false, favoritesCount: 0 };

    this.articleForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      body: new FormControl(),
      tags: new FormControl()
    });
  }

  publishArticle() {
    const article = this.articleForm.value;
    article.tagList = (article.tags || '').split(',').map(tag => tag.trim());
    delete article.tags;

    this.api.publishArticle(null, { article }).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}

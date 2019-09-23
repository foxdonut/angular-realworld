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
  tagList: string[] = [];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.article = { title: null, description: null, body: null, tagList: [], author: null,
      createdAt: null, updatedAt: null, slug: null, favorited: false, favoritesCount: 0 };

    const tags = new FormControl();

    this.articleForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      body: new FormControl(),
      tags
    });

    tags.valueChanges.subscribe(value => {
      this.tagList = value
        .split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0);
    });
  }

  publishArticle() {
    const article = this.articleForm.value;
    article.tagList = this.tagList;
    delete article.tags;

    this.api.publishArticle(null, { article }).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}

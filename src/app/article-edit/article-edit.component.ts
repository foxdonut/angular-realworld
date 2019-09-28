import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Article } from '../model/article.model';
import { ApiService } from '../api/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styles: []
})
export class ArticleEditComponent implements OnInit {
  articleForm: FormGroup;
  tagList: string[];
  slug: string;
  errors: string[];

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const article: Article = this.route.snapshot.data.article || {};
    this.slug = article.slug;
    this.tagList = article.tagList || [];

    const tags = new FormControl(this.tagList.join(', '));

    this.articleForm = new FormGroup({
      title: new FormControl(article.title),
      description: new FormControl(article.description),
      body: new FormControl(article.body),
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

    this.api.publishArticle(this.slug, { article }).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (response: any) => {
        const errors = response.error.errors;
        this.errors = Object.keys(errors).map(key => `${key} ${errors[key][0]}`);
      });
  }
}

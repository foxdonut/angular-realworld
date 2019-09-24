import { Component, OnInit } from '@angular/core';
import { WithUserComponent } from '../with-user/with-user.component';
import { StateService } from '../state/state.service';
import { defaultImage } from '../model/constants.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api/api.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../model/article.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styles: []
})
export class ArticleDetailComponent extends WithUserComponent implements OnInit {
  loading = true;
  article: Article;
  defaultImage: string;
  commentForm: FormGroup;

  constructor(state: StateService, private api: ApiService, private route: ActivatedRoute) {
    super(state);
  }

  ngOnInit() {
    this.defaultImage = defaultImage;

    this.commentForm = new FormGroup({
      comment: new FormControl()
    });

    this.api.getArticle(this.route.snapshot.params.slug).subscribe((article: Article) => {
      this.article = article;
      this.loading = false;
    });
  }

}

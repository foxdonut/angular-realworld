import { Component, OnInit } from '@angular/core';
import { WithUserComponent } from '../with-user/with-user.component';
import { StateService } from '../state/state.service';
import { defaultImage } from '../model/constants.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../model/article.model';
import { Profile } from '../model/profile.model';
import { Comment } from '../model/comment.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styles: []
})
export class ArticleDetailComponent extends WithUserComponent implements OnInit {
  loading = true;
  article: Article;
  comments: Comment[];
  defaultImage: string;
  commentForm: FormGroup;

  constructor(state: StateService, private api: ApiService, private router: Router,
              private route: ActivatedRoute) {
    super(state);
  }

  getComments() {
    this.api.getComments(this.article.slug).subscribe((comments: Comment[]) => {
      this.comments = comments;
    });
  }

  ngOnInit() {
    this.defaultImage = defaultImage;

    this.commentForm = new FormGroup({
      body: new FormControl()
    });

    const slug = this.route.snapshot.params.slug;

    this.api.getArticle(slug).subscribe((article: Article) => {
      this.article = article;
      this.getComments();
      this.loading = false;
    });
  }

  onToggleFavoriteArticle(article: Article): void {
    if (this.getUser()) {
      this.state.toggleFavoriteArticle(article);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onToggleFollowProfile(profile: Profile): void {
    if (this.getUser()) {
      this.state.toggleFollowProfile(profile);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onPostComment() {
    this.api.addComment(this.article.slug, this.commentForm.value.body).subscribe(() => {
      this.commentForm.reset();
      this.getComments();
    });
  }

  onDeleteComment(slug: string, id: string): void {
    this.api.deleteComment(slug, id).subscribe(() => {
      this.getComments();
    });
  }
}

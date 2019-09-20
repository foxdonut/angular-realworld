import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from '../state/state.service';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../model/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  user: User;

  constructor(private state: StateService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userSubscription = this.state.user.subscribe((user: User) => {
      this.user = user;
    });

    this.route.queryParams.subscribe((queryParams: Params) => {
      const articleFilterUpdate = {
        tag: queryParams.tag,
        feed: queryParams.feed === 'true',
        offset: queryParams.offset ? parseInt(queryParams.offset, 10) : undefined,
        favorited: undefined,
        author: undefined
      };

      this.state.updateArticleFilter(articleFilterUpdate);
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  getFilterTag(): string {
    return this.state.getArticleFilter().tag;
  }

  getFilterFeed(): boolean {
    return this.state.getArticleFilter().feed;
  }
}

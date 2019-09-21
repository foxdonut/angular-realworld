import { Component, OnInit } from '@angular/core';
import { StateService } from '../state/state.service';
import { ActivatedRoute, Params } from '@angular/router';
import { WithUserComponent } from '../with-user/with-user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent extends WithUserComponent implements OnInit {
  constructor(state: StateService, private route: ActivatedRoute) {
    super(state);
  }

  ngOnInit() {
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

  getFilterTag(): string {
    return this.state.getArticleFilter().tag;
  }

  getFilterFeed(): boolean {
    return this.state.getArticleFilter().feed;
  }
}

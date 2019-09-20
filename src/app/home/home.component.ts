import { Component, OnInit } from '@angular/core';
import { StateService } from '../state/state.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(private state: StateService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: Params) => {
      const articleFilterUpdate = {
        tag: queryParams.tag,
        feed: queryParams.feed,
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
}

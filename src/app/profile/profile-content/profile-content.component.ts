import { Component, OnInit, Input } from '@angular/core';
import { StateService } from 'src/app/state/state.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styles: []
})
export class ProfileContentComponent implements OnInit {
  @Input() isFavorites: boolean;
  @Input() username: string;

  constructor(private state: StateService, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.isFavorites) {
      this.state.updateArticleFilter({ favorited: this.username, author: undefined, offset: 0 });
    } else {
      this.state.updateArticleFilter({ author: this.username, favorited: undefined, offset: 0 });
    }

    // FIXME: duplicate code
    this.route.queryParams.subscribe((queryParams: Params) => {
      const articleFilterUpdate = {
        tag: queryParams.tag,
        feed: queryParams.feed,
        offset: queryParams.offset ? parseInt(queryParams.offset, 10) : undefined
      };

      this.state.updateArticleFilter(articleFilterUpdate);
    });
  }

}

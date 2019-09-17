import { Component, OnInit, Input } from '@angular/core';
import { StateService } from '../state/state.service';
import { ArticleFilter } from '../model/article-filter.model';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styles: []
})
export class PagerComponent implements OnInit {
  @Input() articlesCount: number;

  from: number;
  to: number;
  pageList: number[];
  currentPageNumber: number;
  filter: ArticleFilter;

  constructor(private state: StateService) { }

  private range(start: number, end: number): number[] {
    const arr = [];
    for (let i = start; i < end; i++) {
      arr.push(i);
    }
    return arr;
  }

  ngOnInit() {
    this.state.articleFilter.subscribe((filter: ArticleFilter) => {
      const offset = filter.offset || 0;
      this.currentPageNumber = offset / filter.limit + 1;
      this.pageList = this.range(1, Math.ceil(this.articlesCount / filter.limit) + 1);
      this.from = offset + 1;
      this.to = Math.min(this.from + filter.limit - 1, this.articlesCount);
      this.filter = filter;
    });
  }

}

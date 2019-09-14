import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styles: []
})
export class PagerComponent implements OnInit {
  @Input() articlesCount: number;

  constructor() { }

  ngOnInit() {
  }

}
/*
import { range } from "../util/fp"
import { getArticlesFilter } from "../routes"
import { router } from "../router"

export const Pager = ({ state, routing }) => {
  const filter = getArticlesFilter(state.route.current)
  const currentPageNumber = filter.offset / filter.limit + 1
  const pageList = range(1, Math.ceil(state.articlesCount / filter.limit) + 1)
  const from = filter.offset + 1
  const to = Math.min(from + filter.limit - 1, state.articlesCount)
  const params = routing.localSegment.params
}
*/

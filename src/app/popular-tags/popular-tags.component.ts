import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popular-tags.component.html',
  styles: []
})
export class PopularTagsComponent implements OnInit {
  loading = true;
  tags = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getPopularTags().subscribe((response: any) => {
      this.tags = response.tags;
      this.loading = false;
    });
  }

}

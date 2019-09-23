import { Component, OnInit } from '@angular/core';
import { WithUserComponent } from '../with-user/with-user.component';
import { StateService } from '../state/state.service';
import { defaultImage } from '../model/constants.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styles: []
})
export class ArticleDetailComponent extends WithUserComponent implements OnInit {
  defaultImage: string;
  articleForm: FormGroup;

  constructor(state: StateService) {
    super(state);
  }

  ngOnInit() {
    this.defaultImage = defaultImage;
  }

}

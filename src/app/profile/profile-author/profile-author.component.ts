import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-author',
  templateUrl: './profile-author.component.html',
  styles: []
})
export class ProfileAuthorComponent implements OnInit {
  username: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.username = this.route.parent.snapshot.params.username;
  }

}

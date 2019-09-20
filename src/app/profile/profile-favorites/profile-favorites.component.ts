import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styles: []
})
export class ProfileFavoritesComponent implements OnInit {

  username: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.username = this.route.snapshot.parent.params.username;
  }

}

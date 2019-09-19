import { Component, OnInit } from '@angular/core';
import { Profile } from '../model/profile.model';
import { Params, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  isFavorites: boolean;
  loadingProfile = true;
  username: string;
  profile: Profile;
  defaultImage = 'https://static.productionready.io/images/smiley-cyrus.jpg';

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    console.log('ngOnInit');
    this.route.data.subscribe((data: Params) => {
      this.isFavorites = data.isFavorites;
    });

    this.route.params.subscribe((params: Params) => {
      if (params.username !== this.username) {
        this.loadingProfile = true;
        this.username = params.username;

        this.api.getProfile(this.username).subscribe((profile: Profile) => {
          this.profile = profile;
          this.loadingProfile = false;
        });
      }
    });
  }

}

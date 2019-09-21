import { Component, OnInit } from '@angular/core';
import { Profile } from '../model/profile.model';
import { Params, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';
import { StateService } from '../state/state.service';
import { WithUserComponent } from '../with-user/with-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent extends WithUserComponent implements OnInit {
  loadingProfile = true;
  username: string;
  profile: Profile;
  defaultImage = 'https://static.productionready.io/images/smiley-cyrus.jpg';

  constructor(private route: ActivatedRoute, private api: ApiService, state: StateService) {
    super(state);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.loadingProfile = true;
      this.username = params.username;

      this.api.getProfile(this.username).subscribe((profile: Profile) => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    });
  }

  isCurrentUser() {
    const user = this.getUser();
    return user && user.username === this.username;
  }
}

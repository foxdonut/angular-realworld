import { Component, OnInit } from '@angular/core';
import { Profile } from '../model/profile.model';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { StateService } from '../state/state.service';
import { WithUserComponent } from '../with-user/with-user.component';
import { defaultImage } from '../model/constants.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent extends WithUserComponent implements OnInit {
  loadingProfile = true;
  username: string;
  profile: Profile;
  defaultImage: string;

  constructor(private router: Router, private route: ActivatedRoute,
              private api: ApiService, state: StateService) {
    super(state);
  }

  ngOnInit() {
    this.defaultImage = defaultImage;

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

  onToggleFollowProfile(profile: Profile): void {
    if (this.getUser()) {
      this.state.toggleFollowProfile(profile);
    } else {
      this.router.navigate(['/login']);
    }
  }
}

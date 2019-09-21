import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WithUserComponent } from '../with-user/with-user.component';
import { StateService } from '../state/state.service';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent extends WithUserComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(state: StateService, private api: ApiService, private router: Router) {
    super(state);
  }

  ngOnInit() {
    const user = this.getUser();

    this.settingsForm = new FormGroup({
      image: new FormControl(user.image),
      username: new FormControl(user.username),
      bio: new FormControl(user.bio),
      email: new FormControl(user.email),
      password: new FormControl()
    });
  }

  /*
  const errors = Object.keys(state.settings.errors || {}).map(
    key => `${key} ${state.settings.errors[key]}`
  )
  */

  logout() {
    this.api.clearToken();
    this.state.user = null;
    this.router.navigate(['/']);
  }
}

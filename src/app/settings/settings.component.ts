import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WithUserComponent } from '../with-user/with-user.component';
import { StateService } from '../state/state.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent extends WithUserComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(state: StateService) {
    super(state);
  }

  ngOnInit() {
    super.ngOnInit();

    this.settingsForm = new FormGroup({
      image: new FormControl(this.user.image),
      username: new FormControl(this.user.username),
      bio: new FormControl(this.user.bio),
      email: new FormControl(this.user.email),
      password: new FormControl()
    });
  }

  /*
  const errors = Object.keys(state.settings.errors || {}).map(
    key => `${key} ${state.settings.errors[key]}`
  )
  */
}

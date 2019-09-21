import { Component } from '@angular/core';
import { StateService } from '../state/state.service';
import { User } from '../model/user.model';

@Component({ template: '' })
export class WithUserComponent {
  state: StateService;

  constructor(state: StateService) {
    this.state = state;
   }

  getUser(): User {
    return this.state.user;
  }
}

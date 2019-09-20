import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from '../state/state.service';
import { Subscription } from 'rxjs';
import { User } from '../model/user.model';

@Component({ template: '' })
export class WithUserComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  user: User;

  constructor(private state: StateService) { }

  ngOnInit() {
    this.userSubscription = this.state.user.subscribe((user: User) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}

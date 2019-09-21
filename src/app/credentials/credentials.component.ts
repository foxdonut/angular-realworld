import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api/api.service';
import { StateService } from '../state/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styles: []
})
export class CredentialsComponent implements OnInit {
  @Input() options: any = {};

  credentialsForm: FormGroup;
  errors = [];

  constructor(private api: ApiService, private state: StateService, private router: Router) { }

  ngOnInit() {
    this.credentialsForm = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit() {
    const form = this.credentialsForm.value;
    const fields = ['email', 'password'].concat(this.options.method === 'register' ? ['username'] : []);
    const params = fields.reduce((result, field) => {
      result[field] = form[field];
      return result;
    }, {});
    this.api[this.options.method]({ user: params }).subscribe(
      (response: any) => {
        this.state.user = response.user; // FIXME
        this.api.setToken(response.user.token);
        this.router.navigate(['/']);
      },
      (response: any) => {
        const errors = response.error.errors;
        this.errors = Object.keys(errors).map(key =>
          key + ' ' + errors[key].join(', ')
        );
      }
    );
  }
}

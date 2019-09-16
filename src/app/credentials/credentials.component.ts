import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styles: []
})
export class CredentialsComponent implements OnInit {
  @Input() options: any = {};

  credentialsForm: FormGroup;

  constructor(private api: ApiService) { }

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
      result[field] = form.field;
      return result;
    }, {});
    this.api[this.options.method](params).subscribe(
      (response: any) => {
      },
      (err: any) => {
      }
    );
    /*
    credentialsApi[method]({ user: pick(fields, state[method]) })
      .then(({ user }) => {
        setToken(user.token)
        update([navigateTo(Route.Home()), { user }])
      })
      .catch(err => update({ [method]: { errors: err.response && err.response.errors } }))
    */
  }
}

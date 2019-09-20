import { Component } from '@angular/core';
import { WithUserComponent } from './with-user/with-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent extends WithUserComponent {
}

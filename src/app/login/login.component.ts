import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { from } from 'rxjs'

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  mode: 'login' | 'register' = 'login'
  from: FormGroup
  constructor() {
    this.from = new FormGroup({
      username: new FormControl(null, Validators.required, va)
    })
  }
}

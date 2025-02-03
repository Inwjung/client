// import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, Signal } from '@angular/core';
// import { environment } from '../../environments/environment';
import { MemberComponent } from '../member/member.component';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-home',
  imports: [MemberComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private accountService = inject(AccountService)
  // private http = inject(HttpClient)
  user: Signal<User | undefined>

  // callError(code: number) {
  //   const url = environment.baseUrl + 'api/error/' + code
  //   this.http.get(url).subscribe({
  //     error: e => console.log(e)
  //   })
  // }
  constructor() {
    this.user = computed(() => this.accountService.data()?.user)
  }

}

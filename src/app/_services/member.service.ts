import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { default_paginator, Paginator, UserQueryPagination } from '../_helper/Pagination';
import { User } from '../_models/user';
import { cacheManager } from '../_helper/cache';
import { parseQuery, parseUserPhoto } from '../_helper/helper';
import { firstValueFrom } from 'rxjs';

type dataCategory = 'member' | 'follower' | 'following'

@Injectable({
  providedIn: 'root'
})

export class MemberService {
  private http = inject(HttpClient);
  private url = environment.baseUrl + 'api/' //user;
  pagaintor = signal<Paginator<UserQueryPagination, User>>(default_paginator);
  // pagaintor = signal<Paginator<UserQueryPagination, User>>(default_paginator)


  private getData(category: dataCategory) {
    const pagination = this.pagaintor().pagination


    let key = cacheManager.createKey(pagination)
    const cacheData = cacheManager.load(key, category)
    if (cacheData) {
      console.log(`load : ${category} from cache !`)
      this.pagaintor.set(cacheData)
      return
    }


    console.log(`load ${category} from server !`)
    const url = this.url + 'user/' + parseQuery(pagination)
    this.http.get<Paginator<UserQueryPagination, User>>(url).subscribe({
      next: response => {
        key = cacheManager.createKey(pagination)
        cacheManager.save(key, category, response)
        this.pagaintor.set(response)
      }
    })

  }

  getMembers() {
    this.getData('member')
  }

  async getMemberByUsername(username: string): Promise<User | undefined> {
    const member = this.pagaintor().items.find(obj => obj.username === username)
    if (member) {
      console.log('get from cache')
      return member
    } else {
      console.log('get from api')
      try {
        const url = this.url + 'user/' + username
        const member = await firstValueFrom(this.http.get<User>(url))
        return parseUserPhoto(member)

      } catch (error) {
        console.error('Get Member Error: ', error)
      }
    }
    return undefined
  }
}
/*
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { MemberService } from '../_services/member.service'
import { default_pageSizeOption, default_paginator, Paginator, UserQueryPagination } from '../_helper/Pagination'
import { User } from '../_models/user'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion'
import { FormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'
import { MemberCardComponent } from './member-card/member-card.component'
import { LikeService } from '../_services/like.service'
// import { MatIconModule } from '@angular/material/icon';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { CdkAccordionModule } from '@angular/cdk/accordion';

@Component({
  selector: 'app-member',
  // imports: [MatPaginatorModule, MatExpansionModule, MatIconModule, MatFormFieldModule, CdkAccordionModule],
  imports: [MemberCardComponent, MatPaginatorModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatExpansionPanel,
    FormsModule, MatFormFieldModule,
    MatButtonModule, MatSelectModule,
  ],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent implements OnInit {
  private memberService = inject(MemberService)
  paginator: WritableSignal<Paginator<UserQueryPagination, User>>
  pageSize = default_pageSizeOption
  private _likeService = inject(LikeService)
  isLikeMember = false


  constructor() {
    this.paginator = this.memberService.pagaintor
    // this.memberService.getMembers();
  }
  ngOnInit(): void {
    this.memberService.getMembers()
    if (this.memberService) {
      this.isLikeMember = this._likeService.IsFollowingMember(this.memberService().id)
    }
  }

  onPageChange(event: PageEvent) {
    const copyPaginator = this.paginator()
    copyPaginator.pagination.currentPage = event.pageIndex + 1
    copyPaginator.pagination.pageSize = event.pageIndex
    this.paginator.set(copyPaginator)

    this.onsearch()
  }
  onsearch() {
    this.memberService.getMembers()
  }
  onResetSearch() {
    this.paginator.set(default_paginator)
    this.onsearch()
  }
  // toggleLike(){
  //   if(this.memberService)
  // }
}
*/
import { Component, inject, OnInit, WritableSignal } from '@angular/core'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { MemberService } from '../_services/member.service'
import { default_pageSizeOption, default_paginator, Paginator, UserQueryPagination } from '../_helper/Pagination'
import { User } from '../_models/user'
import { MatExpansionModule } from '@angular/material/expansion'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatIcon } from '@angular/material/icon'
import { MemberCardComponent } from './member-card/member-card.component'


@Component({
  selector: 'app-member',
  imports: [MemberCardComponent, MatIcon, MatSelectModule, MatButtonModule, MatPaginatorModule, MatExpansionModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent implements OnInit {
  private memberservice = inject(MemberService)
  paginator: WritableSignal<Paginator<UserQueryPagination, User>>
  pageSize = default_pageSizeOption
  constructor() {
    this.paginator = this.memberservice.pagaintor
  }
  ngOnInit(): void {
    this.memberservice.getMembers()
  }
  onPageChange(event: PageEvent) {
    const copypaginator = this.paginator()
    copypaginator.pagination.currentPage = event.pageIndex + 1
    copypaginator.pagination.pageSize = event.pageSize
    this.paginator.set(copypaginator)
    this.onsearch()

  }

  onsearch() {
    this.memberservice.getMembers()
  }
  onReset() {
    this.paginator.set(default_paginator)
    this.onsearch()


  }
}


// onReset() {          onReset ที่ข้อมูลในฟิลหาย
//   const resetPagination: UserQueryPagination = {
//     username: '',
//     looking_for: '',
//     gender: '',
//     min_age: undefined,
//     max_age: undefined,
//     currentPage: 1,
//     pageSize: this.paginator().pagination.pageSize ?? 10,
//     length: 0
//   }

//   // อัปเดต paginator ใหม่
//   this.paginator.set({ ...this.paginator(), pagination: resetPagination });

//   // บังคับให้ Angular detect การเปลี่ยนแปลง
//   setTimeout(() => this.onSearch(), 0);
// }